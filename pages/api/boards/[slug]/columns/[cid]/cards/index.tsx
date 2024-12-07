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
    const db = client.db("trello");

    const requestType = req.method;

    switch (requestType) {
      case "GET": {
        console.log("Handling GET request");
        const columns = await db
          .collection("cards")
          .find({ boardId: slug })
          .toArray();
        console.log("Columns found:", columns);
        res.send(columns);
        return;
      }

      case "POST": {
        const {
          id,
          boardId,
          columnId,
          dateCreated,
          userId,
          title,
          type,
          description,
          sequence,
          files,
        } = req.body;

        const data = {
          _id: id,
          boardId,
          columnId,
          title,
          type,
          dateCreated,
          userId,
          sequence,
          description,
          files,
        };

        const card = await db.collection("cards").insertOne(data);
        console.log("Card inserted:", card); // Log the inserted card
        res.send(card);
        return;
      }

      case "DELETE": {
        console.log("Handling DELETE request"); // Log the request type
        await db.collection("columns").deleteMany({ boardId: slug });
        console.log("All columns deleted"); // Log the deletion
        res.send({ message: "All columns deleted" });
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

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Set your desired limit, e.g., '10mb'
    },
  },
};
