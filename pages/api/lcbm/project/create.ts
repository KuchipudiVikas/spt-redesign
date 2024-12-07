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

  const { name, user_id, data, page_width, page_height } = req.body;

  const client = new Client({
    ...dbConfig
  });

  await client.connect();

  const insertProjectQuery = `
    INSERT INTO low_content_projects (name, user_id, created_at, updated_at)
    VALUES ($1, $2, NOW(), NOW())
    RETURNING id;
  `;

  const insertPageQuery = `
    INSERT INTO pages (project_id, created_at, updated_at, page_width, page_height, data, page_type)
    VALUES ($1, NOW(), NOW(), $2, $3, $4, $5)
    RETURNING *;
  `;

  const projectValues = [name, user_id];
  const pageValues = [null, 8.5, 11, data, "blank"];

  try {
    const projectResult = await client.query(insertProjectQuery, projectValues);
    const projectId = projectResult.rows[0].id;

    pageValues[0] = projectId;
    const pageResult = await client.query(insertPageQuery, pageValues);

    res.status(201).json({
      project: projectResult.rows[0],
      page: pageResult.rows[0]
    });
  } catch (error) {
    console.error("Error inserting row:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.end();
  }
};

export default handler;
