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

    console.log("slug is", slug);

    switch (requestType) {
      case "GET": {
        console.log("Handling GET request"); // Log the request type
        const board = await db
          .collection("boards")
          .findOne({ createdBy: slug });
        console.log("Board found:", board); // Log the retrieved board
        res.send({
          boardFound: board ? true : false,
          board,
        });
        break;
      }

      case "PATCH": {
        console.log("Handling PATCH request"); // Log the request type
        const { _id, name, dateCreated, createdBy, backgroundImage } = req.body;

        const data = {
          _id,
          name,
          dateCreated,
          createdBy,
          backgroundImage,
        };

        const board = await db
          .collection("boards")
          // @ts-ignore
          .updateOne({ _id: slug }, { $set: data });
        console.log("Board updated:", board); // Log the updated board
        res.send(board);

        break;
      }

      case "DELETE": {
        console.log("Handling DELETE request"); // Log the request type
        await db.collection("cards").deleteMany({ boardId: slug });
        await db.collection("columns").deleteMany({ boardId: slug });
        // @ts-ignore
        await db.collection("boards").deleteOne({ _id: slug });

        console.log("Board and related data deleted"); // Log the deletion
        res.send({ message: "Deleted board with columns and cards" });

        break;
      }

      default:
        console.log("Unhandled request type:", requestType); // Log unhandled request types
        res.send({ message: "DB error" });
        break;
    }
  } catch (error) {
    console.error("Database connection error:", error); // Log database connection error
    res.send({ msg: "DB connection error", status: 400 });
  } finally {
    await client.close();
  }
}
