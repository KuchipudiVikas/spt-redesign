import { NextApiRequest, NextApiResponse } from "next";
import { s3Client } from "@/services/audioBook";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { track, start } = req.query;
  let pdfSecret = "spt-ccv-sps-212-2018";

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).send({ error: "Missing or invalid authorization header" });
    return;
  }

  const token = authHeader.split(" ")[1];
  if (token !== pdfSecret) {
    res.status(403).send({ error: "Invalid token" });
    return;
  }
  var params = {
    Bucket: "booksbytitans-bucket",
    Key: `pdf/spt-book.pdf`,
    Range: `bytes=${start}-`,
  };
  const stream = s3Client.getObject(params).createReadStream();
  stream.on("error", (err) => {
    res.status(202).send({ error: "Error:  aborting stream", err });
  });
  stream.pipe(res);
}
