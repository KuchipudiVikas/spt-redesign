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

  const { type } = req.body;

  const client = new Client(dbConfig);

  try {
    await client.connect();

    let query =
      "SELECT DISTINCT(category) FROM imageindex WHERE type = $1 AND is_private = false";
    const queryParams: (string | number)[] = [type];

    const result = await client.query(query, queryParams);
    const images = result.rows;

    // Set caching headers
    res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");

    // @ts-ignore
    res.status(200).json({ images });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.end();
  }
};

export default handler;
