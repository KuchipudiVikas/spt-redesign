import { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";

const spacesEndpoint = new AWS.Endpoint("https://nyc3.digitaloceanspaces.com");

const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DO_SPACES_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET
});

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

  const { key } = req.query;

  if (!key || !Array.isArray(key)) {
    return res.status(400).json({ error: "Image key is required" });
  }

  const imageKey = key.join("/");

  try {
    const params = {
      Bucket: "coverimages",
      Key: imageKey
    };

    const data = await s3.getObject(params).promise();

    res.setHeader(
      "Content-Type",
      data.ContentType || "application/octet-stream"
    );
    res.setHeader("Content-Length", data.ContentLength?.toString() || "0");
    res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");

    res.status(200).send(data.Body);
  } catch (error) {
    console.error(
      "v121: Error fetching image from DigitalOcean Spaces:",
      error
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
