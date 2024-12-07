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
      case "POST": {
        const { _id, name, dateCreated, createdBy, backgroundImage } = req.body;

        const data = {
          _id,
          name,
          dateCreated,
          createdBy,
          backgroundImage,
          users: [],
        };

        const board = await db.collection("boards").insertOne(data);

        const predefinedCols = ["Book Ideas", "Keywords", "General"];

        const colDataArray = predefinedCols.map((colName, index) => ({
          _id: `${_id}-${index}`,
          boardId: _id,
          columnName: colName,
          dateCreated: new Date().toLocaleString(),
          sequence: index,
        }));

        // @ts-ignore
        await db.collection("columns").insertMany(colDataArray);

        res.send(board);
        return;
      }

      case "GET": {
        const { userid } = req.query;

        const boards = await db
          .collection("boards")
          .find({ createdBy: userid })
          .limit(30)
          .toArray();

        const invitedBoards = await db
          .collection("boards")
          .find({ users: userid })
          .toArray();
        const updatedBoards = boards.concat(invitedBoards);

        res.send(updatedBoards);

        return;
      }

      default:
        res.status(405).end(); // Method Not Allowed
        return;
    }
  } catch (error) {
    console.error("Database connection error:", error); // Log database connection error
    res.status(500).send({ msg: "DB connection error", status: 500 });
  } finally {
    await client.close();
  }
}
