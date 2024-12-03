// import AWS from "aws-sdk";

// let s3Client = new AWS.S3({
//   // Enter the endpoint from the DO website for your space
//   endpoint: "https://sgp1.digitaloceanspaces.com/",
//   useAccelerateEndpoint: false,
//   // Enter your DO Spaces API key and secret
//   credentials: new AWS.Credentials(
//     "gsTMgeHHaY5TBUvX+RedaDmd4pcIY7GW4C5Ov8wwEjk",
//     "4KQARH3DHYKGFAQW6TG4",
//     null
//   ),
// });

// export { s3Client };
// // https://booksbytitans-bucket.sgp1.cdn.digitaloceanspaces.com/

import AWS from "aws-sdk";

const s3Client = new AWS.S3({
  // Enter the endpoint from the DO website for your space
  endpoint: "https://sgp1.digitaloceanspaces.com/",
  useAccelerateEndpoint: false,
  region: "sgp1",
  credentials: new AWS.Credentials(
    process.env.AUDIO_BOOK_ACCESS_KEY,
    process.env.AUDIO_BOOK_KEY_ID
  ),
});

export { s3Client };
