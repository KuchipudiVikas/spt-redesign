import { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import { Client } from "pg";
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
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { name, limit, offset, type } = req.query;

  const limitValue = limit ? parseInt(limit as string, 10) : 10;
  const offsetValue = offset ? parseInt(offset as string, 10) : 0;

  const client = new Client(dbConfig);

  try {
    await client.connect();

    let query =
      "SELECT name, link, category, preview, access, id FROM imageindex WHERE type = $1 AND is_private = false";
    // @ts-ignore
    const queryParams: (string | number)[] = [type];

    if (name) {
      query += " and name ILIKE $2";
      queryParams.push(`%${name}%`);
    }

    query += " LIMIT $3 OFFSET $4";
    queryParams.push(limitValue + 1, offsetValue);

    const result = await client.query(query, queryParams);
    const images = result.rows;

    const hasMore = images.length > limitValue;
    if (hasMore) {
      images.pop();
    }

    const signedImages = await Promise.all(
      images.map(async (image: { link: string }) => {
        // Parse the URL to extract the key
        const url = new URL(image.link);
        const key = url.pathname.substring(1); // Remove the leading slash

        // Generate the signed URL for the image
        const signedUrl = s3.getSignedUrl("getObject", {
          Bucket: "coverimages",
          Key: key,
          Expires: 60 * 60, // URL expires in 1 hour
        });

        // Return the image object with the signed URL as the link property
        return { ...image, link: signedUrl };
      })
    );

    res.status(200).json({ images: signedImages, hasMore });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.end();
  }
};

export default handler;
