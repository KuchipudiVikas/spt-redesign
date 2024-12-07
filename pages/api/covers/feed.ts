import { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import { Client } from "pg";
import AWS from "aws-sdk";
import { dbConfig } from "@/db";
import crypto from "crypto";

const spacesEndpoint = new AWS.Endpoint("https://nyc3.digitaloceanspaces.com");

const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DO_SPACES_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET,
});

// Simple in-memory cache
const cache: { [key: string]: any } = {};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const client = new Client(dbConfig);

  try {
    await client.connect();

    // Extract page parameter from query
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;

    // Generate cache key
    const cacheKey = `page_${page}`;

    // Check if data is in cache
    if (cache[cacheKey]) {
      res.setHeader("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
      res.setHeader("ETag", cache[cacheKey].etag);
      res.setHeader("Last-Modified", cache[cacheKey].lastModified);
      return res.status(200).json({ images: cache[cacheKey].data });
    }

    // Fetch images with access "free"
    const freeImagesQuery = `
  SELECT * FROM imageindex 
  WHERE type = 'book covers' 
    AND access = 'free' 
    AND is_private = false
  LIMIT ${limit} OFFSET ${offset}
`;
    const freeImagesResult = await client.query(freeImagesQuery);
    const freeImages = freeImagesResult.rows;

    // Fetch images with access "paid"
    const paidImagesQuery = `
  SELECT * FROM imageindex 
  WHERE type = 'book covers' 
    AND access = 'paid' 
    AND is_private = false
  LIMIT ${limit} OFFSET ${offset}
`;
    const paidImagesResult = await client.query(paidImagesQuery);
    const paidImages = paidImagesResult.rows;

    // Combine the results
    const images = [...freeImages, ...paidImages];

    // Check if images array is empty
    if (images.length === 0) {
      console.warn("No images found");
    }

    // Generate pre-signed URLs for the images
    const signedImages = await Promise.all(
      images.map(async (image: { link: string }) => {
        try {
          // Parse the URL to extract the key
          // const url = new URL(image.link);
          // let key = url.pathname.substring(1); // Remove the leading slash

          // // Decode the key if it contains encoded characters
          // key = decodeURIComponent(key);

          // // Trim any leading or trailing spaces
          // key = key.trim();

          // // Generate the signed URL for the image
          // const signedUrl = s3.getSignedUrl("getObject", {
          //   Bucket: "coverimages",
          //   Key: key,
          //   Expires: 60 * 60 // URL expires in 1 hour
          // });

          // Return the image object with the signed URL as the link property
          return { ...image };
        } catch (error) {
          console.error(`Error processing image ${image.link}:`, error);
          return image; // Return the original image object in case of error
        }
      })
    );

    const etag = crypto
      .createHash("md5")
      .update(JSON.stringify(signedImages))
      .digest("hex");
    const lastModified = new Date().toUTCString();

    cache[cacheKey] = {
      data: signedImages,
      etag,
      lastModified,
    };

    res.setHeader("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
    res.setHeader("ETag", etag);
    res.setHeader("Last-Modified", lastModified);

    res.status(200).json({ images: signedImages });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.end();
  }
};

export default handler;
