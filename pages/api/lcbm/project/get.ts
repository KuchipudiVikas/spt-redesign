// @ts-ignore
import { Client } from "pg";
import type { NextApiRequest, NextApiResponse } from "next";
import { dbConfig } from "@/db";

export const config = {
  api: {
    bodyParser: true // Enable the default body parser
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

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { projectId } = req.query;

  if (!projectId) {
    return res.status(400).json({ error: "Project ID is required" });
  }

  const client = new Client({
    ...dbConfig
  });

  await client.connect();

  const getProjectQuery = `
    SELECT * FROM low_content_projects WHERE id = $1;
  `;

  const getPagesQuery = `
    SELECT * FROM pages WHERE project_id = $1;
  `;

  try {
    const projectResult = await client.query(getProjectQuery, [projectId]);
    const pagesResult = await client.query(getPagesQuery, [projectId]);

    if (projectResult.rows.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({
      project: projectResult.rows[0],
      pages: pagesResult.rows
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.end();
  }
};

export default handler;
