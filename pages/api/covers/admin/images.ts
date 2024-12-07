import { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import { Client, Pool } from "pg";
import AWS from "aws-sdk";
import { dbConfig } from "@/db";

const spacesEndpoint = new AWS.Endpoint("https://nyc3.digitaloceanspaces.com");

const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DO_SPACES_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // Update this to match your frontend URL
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { category, type, limit = 10, page = 1 } = req.body;

  // const client = new Client(dbConfig);

  const pool = new Pool(dbConfig);

  try {
    const client = await pool.connect();

    const offset = (page - 1) * limit;

    let query =
      "SELECT * FROM imageindex WHERE type = $1 AND category = $2 and is_private = true LIMIT $3 OFFSET $4";
    const queryParams: (string | number)[] = [type, category, limit, offset];

    const result = await client.query(query, queryParams);
    const images = result.rows;

    // Check if there are more records beyond the current page
    const hasMoreQuery =
      "SELECT COUNT(*) FROM imageindex WHERE type = $1 and is_private = true AND category = $2";
    const hasMoreResult = await client.query(hasMoreQuery, [type, category]);
    const totalRecords = parseInt(hasMoreResult.rows[0].count, 10);
    const hasMore = offset + images.length < totalRecords;

    // Generate pre-signed URLs for the images
    // const signedImages = await Promise.all(
    //   images.map(async (image: { link: string }) => {
    //     try {
    //       // Parse the URL to extract the key
    //       const url = new URL(image.link);
    //       let key = url.pathname.substring(1); // Remove the leading slash

    //       // Decode the key if it contains encoded characters
    //       key = decodeURIComponent(key);

    //       // Log the k

    //       // Generate the signed URL for the image
    //       const signedUrl = s3.getSignedUrl("getObject", {
    //         Bucket: "coverimages",
    //         Key: key,
    //         Expires: 60 * 60 // URL expires in 1 hour
    //       });

    //       // Return the image object with the signed URL as the link property
    //       return { ...image, link: signedUrl };
    //     } catch (error) {
    //       console.error(`Error processing image ${image.link}:`, error);
    //       return image; // Return the original image object in case of error
    //     }
    //   })
    // );

    client.release();

    res.status(200).json({ images: images, hasMore });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // await client.end();
  }
};

export default handler;
