// @ts-ignore
import { Client } from "pg";
import type { NextApiRequest, NextApiResponse } from "next";
import { json } from "micro";
import { dbConfig } from "@/db";

// Disable the default body parser
export const config = {
  api: {
    bodyParser: false
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // Update this to match your frontend URL
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const client = new Client({
    ...dbConfig
  });

  await client.connect();

  if (req.method === "GET") {
    const { id, userID } = req.query;

    if (!id) {
      await client.end();
      return res.status(400).json({ error: "Project ID is required" });
    }

    const selectQuery = `
      SELECT * FROM projects WHERE id = $1;
    `;

    try {
      const result = await client.query(selectQuery, [id]);
      if (result.rows.length === 0) {
        await client.end();
        return res.status(404).json({ error: "Project not found" });
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Error retrieving project:", error);
      console.error("Error details:", error.message, error.stack);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await client.end();
    }
  } else if (req.method === "PUT") {
    const body = await json(req, { limit: "10mb" });
    // @ts-ignore
    const {
      id,
      data,
      thumbnail_uri,
      page_width,
      page_height,
      cover_type,
      page_count
    } = body;

    if (!id) {
      await client.end();
      return res.status(400).json({ error: "Project ID is required" });
    }

    const updateQuery = `
      UPDATE projects
      SET data = $1, updated_at = NOW(), thumbnail_uri = $2, page_width = $3, page_height = $4, cover_type = $5, page_count = $6 
      WHERE id = $7
      RETURNING *;
    `;

    const values = [
      data,
      thumbnail_uri,
      page_width,
      page_height,
      cover_type,
      page_count,
      id
    ];

    try {
      const result = await client.query(updateQuery, values);
      if (result.rows.length === 0) {
        await client.end();
        return res.status(404).json({ error: "Project not found" });
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Error updating project:", error);
      console.error("Error details:", error.message, error.stack);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await client.end();
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      await client.end();
      return res.status(400).json({ error: "Project ID is required" });
    }

    const deleteQuery = `
      DELETE FROM projects WHERE id = $1 RETURNING *;
    `;

    try {
      const result = await client.query(deleteQuery, [id]);
      if (result.rows.length === 0) {
        await client.end();
        return res.status(404).json({ error: "Project not found" });
      }
      res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
      console.error("Error deleting project:", error);
      console.error("Error details:", error.message, error.stack);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await client.end();
    }
  } else {
    await client.end();
    return res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
