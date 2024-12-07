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
  const { cardId, slug } = req.query;

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
        res.send({ message: "Get more details of the card" });
        return;
      }

      case "DELETE": {
        console.log("Handling DELETE request"); // Log the request type
        // @ts-ignore
        await db.collection("cards").deleteOne({ _id: cardId });
        console.log("Card deleted:", cardId); // Log the deleted card
        res.send({ message: "A card has been deleted" });
        return;
      }

      case "PATCH": {
        console.log("Handling PATCH request"); // Log the request type
        await db
          .collection("cards")
          // @ts-ignore
          .updateOne({ _id: cardId, boardId: slug }, { $set: { ...req.body } });
        console.log("Card updated:", cardId); // Log the updated card
        res.send({ message: "Card updated" });
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
