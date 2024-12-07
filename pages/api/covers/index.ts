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

  const { name, limit, offset } = req.query;

  // Default values for limit and offset
  const limitValue = limit ? parseInt(limit as string, 10) : 10;
  const offsetValue = offset ? parseInt(offset as string, 10) : 0;

  const client = new Client(dbConfig);

  try {
    await client.connect();

    let query =
      "SELECT * FROM imageindex WHERE type = $1 AND category = $2 AND is_private = false LIMIT $3 OFFSET $4";
    const queryParams: (string | number)[] = [];

    if (name) {
      query += " WHERE name ILIKE $1";
      queryParams.push(`%${name}%`);
    }

    query += " LIMIT $2 OFFSET $3";
    queryParams.push(limitValue + 1, offsetValue); // Fetch one extra record to check for more

    const result = await client.query(query, queryParams);
    const images = result.rows;

    // Determine if there are more records
    const hasMore = images.length > limitValue;
    if (hasMore) {
      images.pop(); // Remove the extra record
    }

    // Generate pre-signed URLs for the images
    const signedImages = await Promise.all(
      images.map(async (image: { name: any }) => {
        const signedUrl = s3.getSignedUrl("getObject", {
          Bucket: "coverimages",
          Key: image.name,
          Expires: 60 * 60,
        });
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
