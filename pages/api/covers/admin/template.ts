import { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import { Client, Pool } from "pg";
import { dbConfig } from "@/db";

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

  const { project_id } = req.query;
  const { content, name, category, subcategory } = req.body;

  const pool = new Pool(dbConfig);

  try {
    const client = await pool.connect();

    // Check if a record with the same project_id exists
    const checkQuery = "SELECT id FROM templates WHERE id = $1";
    const checkResult = await client.query(checkQuery, [project_id]);

    if (checkResult.rows.length > 0) {
      // Update the existing record
      const updateQuery = `
        UPDATE templates
        SET name = $1, category = $2, subcategory = $3, content = $4, updated_at = current_timestamp
        WHERE id = $5
      `;
      await client.query(updateQuery, [
        name,
        category,
        subcategory,
        content,
        project_id,
      ]);
    } else {
      // Insert a new record
      const insertQuery = `
        INSERT INTO templates (id, name, category, subcategory, content)
        VALUES ($1, $2, $3, $4, $5)
      `;
      await client.query(insertQuery, [
        project_id,
        name,
        category,
        subcategory,
        content,
      ]);
    }

    res.status(200).json({ message: "Success" });
    client.release();
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    pool.end();
  }
};

export default handler;
