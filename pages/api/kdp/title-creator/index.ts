import { NextApiRequest, NextApiResponse } from "next";
import OpenAi from "openai";
import mongoose, { Document, Schema } from "mongoose";

type TBookData = {
  keyword: string;
  titles: string[];
  language: string;
};

interface ICache extends Document {
  keyword: string;
  titles: string[];
  language: string;
  createdAt: Date;
}

const CacheSchema: Schema = new mongoose.Schema({
  keyword: { type: String, required: true },
  titles: [{ type: String, required: true }],
  language: { type: String, required: true }, // Include language in the cache
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "30d"
  }
});

const CacheModel =
  mongoose.models.Cache || mongoose.model<ICache>("Cache", CacheSchema);

async function GetGPTResponse(
  keyword: string,
  titlesBatch: string[],
  language: string, // Added language parameter
  version: string
) {
  const openai = new OpenAi({ apiKey: process.env.CHAT_GPT_SECRET });

  const prompt = `
Rephrase and translate the following book titles to make them more engaging and suitable for Amazon KDP. Use the keyword "${keyword}" and translate them to "${language}". Capitalize the first letter of each word in the titles.  Return each rephrased and translated title as a string in an array of strings.

Titles to rephrase and translate: ${titlesBatch.join(", ")}
`;

  try {
    const response = await openai.chat.completions.create({
      model: version,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const url =
    "mongodb+srv://kuchipudivikas:test@cluster0.6b4bqm6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  try {
    let { titles, keyword, language }: TBookData = req.body; // Include language in request body

    keyword = keyword.trim();
    language = language.trim();

    await mongoose.connect(url);

    const cachedResult = await CacheModel.findOne({ keyword, language }).lean(); // Check if cache exists for the language too
    if (cachedResult) {
      console.log("cache hit", language);
      return res.status(200).json({
        // @ts-ignore
        gpt: cachedResult.titles
      });
    }

    const batchSize = 20;
    const batchedTitles = [];
    for (let i = 0; i < titles.length; i += batchSize) {
      batchedTitles.push(titles.slice(i, i + batchSize));
    }

    const rephrasedTitles: string[] = [];
    for (const batch of batchedTitles) {
      const gptResponse = await GetGPTResponse(
        keyword,
        batch,
        language, // Pass language to the GPT request
        "gpt-3.5-turbo"
      );

      if (gptResponse) {
        try {
          const parsedResponse = JSON.parse(gptResponse);
          rephrasedTitles.push(...parsedResponse);
        } catch (error) {
          console.error("Error parsing GPT response:", error);
          // Handle the case where the response is not a valid JSON
          rephrasedTitles.push(gptResponse);
        }
      }
    }

    const cacheEntry = new CacheModel({
      keyword,
      titles: rephrasedTitles,
      language // Store the language in cache
    });

    await cacheEntry.save();

    res.status(200).json({
      gpt: rephrasedTitles
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
