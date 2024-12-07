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
  const { cid } = req.query;

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
      case "PATCH": {
        console.log("Handling PATCH request"); // Log the request type
        const board = await db
          .collection("columns")
          // @ts-ignore
          .updateOne({ _id: cid }, { $set: { ...req.body } });
        console.log("Column updated:", board); // Log the updated column
        res.send(board);

        break;
      }

      case "DELETE": {
        console.log("Handling DELETE request"); // Log the request type
        await db.collection("cards").deleteMany({ columnId: cid });
        // @ts-ignore
        await db.collection("columns").deleteOne({ _id: cid });

        console.log("Column and related cards deleted"); // Log the deletion
        res.send({ message: "Deleted" });

        break;
      }

      default:
        console.log("Unhandled request type:", requestType); // Log unhandled request types
        res.send({ message: "Invalid request type" });
        break;
    }
  } catch (error) {
    console.error("Database connection error:", error); // Log database connection error
    res.status(500).send({ msg: "DB connection error", status: 500 });
  } finally {
    await client.close();
  }
}
