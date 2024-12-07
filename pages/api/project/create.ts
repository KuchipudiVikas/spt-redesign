// @ts-ignore
import { Client } from "pg";
import type { NextApiRequest, NextApiResponse } from "next";
import { dbConfig } from "@/db";
import { json } from "micro";

export const config = {
  api: {
    bodyParser: false // Disable the default body parser
  }
};

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

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    req.body = await json(req, { limit: "10mb" });
  } catch (error) {
    return res.status(413).json({ error: "Payload too large" });
  }

  const {
    name,
    user_id,
    data,
    thumbnail_uri,
    template,
    page_width,
    page_height,
    cover_type,
    page_count
  } = req.body;

  const client = new Client({
    ...dbConfig
  });

  await client.connect();

  const insertQuery = `
    INSERT INTO projects (name, user_id, data, created_at, updated_at, thumbnail_uri, template, page_width, page_height, cover_type, page_count)
    VALUES ($1, $2, $3, NOW(), NOW(), $4, $5, $6, $7, $8, $9)
    RETURNING *;
  `;

  const values = [
    name,
    user_id,
    data,
    thumbnail_uri,
    template,
    page_width,
    page_height,
    cover_type,
    page_count
  ];

  try {
    const result = await client.query(insertQuery, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting row:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.end();
  }
};

export default handler;
