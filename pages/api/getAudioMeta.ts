import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

function generateHash(token_security_key, video_id, expiration) {
  const hash = crypto.createHash("sha256");
  hash.update(token_security_key + video_id + expiration);
  return hash.digest("hex");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let embedBase = "https://iframe.mediadelivery.net/embed/";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      AccessKey: "0f281b17-377f-47f4-9acb85d80418-db81-4925",
    },
  };

  let libraryId = "208139";
  let data = [];

  fetch(
    `https://video.bunnycdn.com/library/${libraryId}/videos?page=1&itemsPerPage=100`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      response.items.map((item) => {
        let temp = {
          title: item.title,
          embedUrl: embedBase + libraryId + "/" + item.guid,
          video_id: item.guid,
        };
        data.push(temp);
      });
      res.status(200).json(data);
    });
}
