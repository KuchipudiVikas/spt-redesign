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

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Image ID is required" });
  }

  const client = new Client(dbConfig);

  try {
    await client.connect();

    const query =
      "SELECT name, link, category FROM imageindex WHERE id = $1 AND is_private = false";

    const queryParams = [id];

    const result = await client.query(query, queryParams);
    const image = result.rows[0];

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    const url = new URL(image.link);
    let key = url.pathname.substring(1);

    key = decodeURIComponent(key);

    // Generate pre-signed URL for the image
    const signedUrl = s3.getSignedUrl("getObject", {
      Bucket: "coverimages",
      Key: key,
      Expires: 60 * 60,
    });

    res.status(200).json({ ...image, link: signedUrl });
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.end();
  }
};

export default handler;
