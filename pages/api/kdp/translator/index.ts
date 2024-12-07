import { NextApiRequest, NextApiResponse } from "next";
import OpenAi from "openai";

async function GetGPTResponse(
  content: string,
  version: string,
  fromLanguage: string,
  toLanguage: string
) {
  const openai = new OpenAi({ apiKey: process.env.CHAT_GPT_SECRET });
  try {
    const behaviouralPrompt = `Translate the following content from ${fromLanguage} to ${toLanguage}

    ${content}

    Please return the response in the following format:
    {
        "response": {
            "title": ${content.includes("- Book Title:") ? "string" : "null"},
            "description": ${content.includes("- Book Description:") ? "string" : "null"},
            "author": ${content.includes("- Author Name:") ? "string" : "null"},
            "keywords": ${content.includes("- Keywords:") ? "string[]" : "null"},
            "apluscontent": ${content.includes("- A+ Content:") ? "string" : "null"}
            "contributors": ${content.includes("- Contributors:") ? "string" : "null"}
        }
    }`;

    const response = await openai.chat.completions.create({
      model: version,
      messages: [
        {
          role: "system",
          content: behaviouralPrompt
        },
        {
          role: "user",
          content: content
        }
      ]
    });
    console.log(response);

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error);
  }
}
type TBookData = {
  title: string;
  description: string;
  author: string;
  keywords: string[];
  apluscontent: string;
  fromLanguage: string;
  toLanguage: string;
  contributors: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const {
    title,
    description,
    author,
    keywords,
    apluscontent,
    fromLanguage,
    toLanguage,
    contributors
  }: TBookData = req.body;

  const content = `
  ${title ? `- Book Title: ${title}` : ""}
  ${author ? `- Author Name: ${author}` : ""}
  ${keywords.filter((keyword) => keyword.length > 0).length > 0 ? `- Keywords: ${keywords.filter((keyword) => keyword.length > 0).join(", ")}` : ""}
  ${description ? `- Book Description: ${description}` : ""}
  ${apluscontent ? `- A+ Content: ${apluscontent}` : ""}
  ${contributors ? `- Contributors: ${contributors}` : ""}
`.trim();

  console.log(content);

  const gptResponse = await GetGPTResponse(
    content,
    "gpt-4-turbo",
    fromLanguage,
    toLanguage
  );

  try {
   

    // const data = await response.json();
    res.status(200).json({
      //   llama: data,
      gpt: gptResponse
      //   gpt4: gpt4Response,
      //   gpt4Og: gpt4OgResponse
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
