// @ts-ignore
import { Client } from "pg";
import type { NextApiRequest, NextApiResponse } from "next";
import { dbConfig } from "@/db";

enum ESortOption {
  CREATED_AT = "created_at",
  UPDATED_AT = "updated_at",
  NAME = "name"
}

enum ESortOrder {
  ASC = "asc",
  DESC = "desc"
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // Update this to match your frontend URL
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Disable caching
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    user_id,
    template,
    page = 1,
    sortOrder = ESortOrder.ASC,
    sortOption = ESortOption.CREATED_AT
  } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (!Object.values(ESortOrder).includes(sortOrder as ESortOrder)) {
    return res.status(400).json({ error: "Invalid sort order" });
  }

  if (!Object.values(ESortOption).includes(sortOption as ESortOption)) {
    return res.status(400).json({ error: "Invalid sort option" });
  }

  const client = new Client({
    ...dbConfig
  });

  try {
    await client.connect();

    const limit = 10;
    const offset = (Number(page) - 1) * limit;

    const selectQuery = `
      SELECT id, name, created_at, updated_at, thumbnail_uri 
      FROM projects 
      WHERE user_id = $1 and template = $2
      ORDER BY ${sortOption} ${sortOrder}
      LIMIT $3 OFFSET $4;
    `;

    const result = await client.query(selectQuery, [
      user_id,
      template,
      limit,
      offset
    ]);

    const totalRowsQuery = `SELECT COUNT(*) FROM projects WHERE user_id = $1 and template = $2`;
    const totalRowsResult = await client.query(totalRowsQuery, [
      user_id,
      template
    ]);
    const totalRows = parseInt(totalRowsResult.rows[0].count, 10);
    const hasMore = offset + limit < totalRows;

    res.status(200).json({ projects: result.rows, hasMore });
  } catch (error) {
    console.error("Error retrieving projects:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.end();
  }
};

export default handler;
