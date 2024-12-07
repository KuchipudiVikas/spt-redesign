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
  res.setHeader("Access-Control-Allow-Origin", "*");
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

  if (req.method === "PUT") {
    const body = await json(req, { limit: "10mb" });
    // @ts-ignore
    const { id, name } = body;

    if (!id || !name) {
      await client.end();
      return res
        .status(400)
        .json({ error: "Project ID and name are required" });
    }

    const updateQuery = `
      UPDATE projects
      SET name = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *;
    `;

    const values = [name, id];

    try {
      const result = await client.query(updateQuery, values);
      if (result.rows.length === 0) {
        await client.end();
        return res.status(404).json({ error: "Project not found" });
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Error updating project name:", error);
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
