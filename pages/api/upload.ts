import { NextApiRequest, NextApiResponse } from "next";
import mongoose, { Schema, Document, Model, models } from "mongoose";

const uri =
  "mongodb+srv://kuchipudivikas:test@cluster0.6b4bqm6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

interface IFile extends Document {
  fileName: string;
  fileType: string;
  fileData: string;
}

const fileSchema = new Schema<IFile>({
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  fileData: { type: String, required: true },
});

const File: Model<IFile> =
  models.File || mongoose.model<IFile>("File", fileSchema);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await mongoose
    .connect(uri, {
      // @ts-ignore
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => console.error("Failed to connect to MongoDB:", err));

  if (req.method === "POST") {
    try {
      const { fileName, fileType, fileData } = req.body;

      // Create and save the new file document
      const newFile = new File({
        fileName,
        fileType,
        fileData,
      });

      const savedFile = await newFile.save();

      // Return the uploaded file's data
      res.status(200).json({
        message: "File uploaded successfully",
        file: savedFile, // Return the saved file data
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ error: "Failed to upload file" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
