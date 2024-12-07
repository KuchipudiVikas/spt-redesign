import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://kuchipudivikas:test@cluster0.6b4bqm6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  const { slug } = req.query;

  const client = new MongoClient(uri, {
    // @ts-ignore
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db("trello"); // Replace with your database name

    const requestType = req.method;

    switch (requestType) {
      case "GET": {
        console.log("Handling GET request"); // Log the request type
        const columns = await db
          .collection("columns")
          .find({ boardId: slug })
          .toArray();
        console.log("Columns found:", columns); // Log the retrieved columns
        res.send(columns);

        return;
      }

      case "POST": {
        console.log("Handling POST request"); // Log the request type
        const {
          id,
          boardId,
          boardName,
          columnName,
          dateCreated,
          userId,
          sequence,
        } = req.body;

        const data = {
          _id: id,
          boardId,
          boardName,
          columnName,
          dateCreated,
          userId,
          sequence,
        };

        const board = await db.collection("columns").insertOne(data);
        console.log("Column inserted:", board); // Log the inserted column
        res.send(board);

        return;
      }

      default:
        console.log("Unhandled request type:", requestType); // Log unhandled request types
        res.send({ message: "DB error" });
        break;
    }
  } catch (error) {
    console.error("Database connection error:", error); // Log database connection error
    res.status(500).send({ msg: "DB connection error", status: 500 });
  } finally {
    await client.close();
  }
}
