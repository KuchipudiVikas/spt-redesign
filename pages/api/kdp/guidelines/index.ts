import { NextApiRequest, NextApiResponse } from "next";
import OpenAi from "openai";
import { KDPGuidelines } from "@/constants/guidelines";

type TBookData = {
  title?: string;
  description?: string;
  author?: string;
  keywords?: string[];
  apluscontent?: string;
  bookType?: string;
  contributors?: string;
};

async function GetGPTResponse(
  fieldName: string,
  fieldContent: string,
  version: string
): Promise<string> {
  const openai = new OpenAi({ apiKey: process.env.CHAT_GPT_SECRET });
  try {
    let relevantGuidelines;
    if (fieldName == "A+ Content") {
      relevantGuidelines = KDPGuidelines.filter(
        (g) => g.field === "Book Description"
      );
    } else if (fieldName == "Book Type") {
      relevantGuidelines = KDPGuidelines.filter((g) => g.field === "Content");
    } else {
      relevantGuidelines = KDPGuidelines.filter((g) => g.field === fieldName);
    }

    const behaviouralPrompt = `
      Check the following field for any KDP guidelines violations:
      Field: ${fieldName}
      Content: ${fieldContent}
      Guidelines for reference: ${JSON.stringify(relevantGuidelines)}
      Please list any potential guidelines violations and format the response like:
      {
        "isViolated": boolean,
        "violations": Violated[] | null // array of fields that are violated and the reasons for it like array of {"fieldname": string, "reason":string, "violation":string, "violatedPart" :string, "severity" : "red" | "yellow" // from the guidelines} or null if none
      }
      Ensure the response is **strictly valid JSON** without any additional text, comments, or explanations.
    `;

    const response = await openai.chat.completions.create({
      model: version,
      messages: [
        {
          role: "system",
          content: behaviouralPrompt,
        },
        {
          role: "user",
          content: fieldContent,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to get GPT response");
  }
}

async function checkField(fieldName: string, fieldContent: string) {
  try {
    const gptResponse = await GetGPTResponse(
      fieldName,
      fieldContent,
      "gpt-3.5-turbo"
    );
    const gpt4Response = await GetGPTResponse(
      fieldName,
      fieldContent,
      "gpt-4-turbo"
    );
    const gpt4OgResponse = await GetGPTResponse(
      fieldName,
      fieldContent,
      "gpt-4"
    );

    return {
      fieldName,
      gptResponse,
      gpt4Response,
      gpt4OgResponse,
    };
  } catch (error) {
    console.error(`Error checking field ${fieldName}:`, error);
    return {
      fieldName,
      error: error.message,
    };
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

  const {
    title,
    description,
    author,
    keywords,
    apluscontent,
    bookType,
    contributors,
  }: TBookData = req.body;

  const fieldChecks = [];

  const contentString = `
  ${title ? `Book Title: ${title}` : ""}
  ${keywords ? `Keywords: ${keywords.join(", ")}` : ""}
  ${description ? `Book Description: ${description}` : ""}
  ${apluscontent ? `A+ Content: ${apluscontent}` : ""}
  for ${bookType ? `Book Type: ${bookType}` : ""}
  `;

  if (title) fieldChecks.push(checkField("Book Title", title));
  if (author) fieldChecks.push(checkField("Author Name", author));
  if (keywords) fieldChecks.push(checkField("Keywords", keywords.join(", ")));
  if (description)
    fieldChecks.push(checkField("Book Description", description));
  if (apluscontent) fieldChecks.push(checkField("A+ Content", apluscontent));
  if (bookType) fieldChecks.push(checkField("Book Type", contentString));
  if (contributors) fieldChecks.push(checkField("Contributors", contributors));

  try {
    const results = await Promise.all(fieldChecks);

    res.status(200).json(results);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
