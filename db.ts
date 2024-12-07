import AWS from "aws-sdk";

export const dbConfig = {
  user: "doadmin",
  host: "db-cover-design-tool-do-user-3446361-0.l.db.ondigitalocean.com",
  database: "defaultdb",
  password: "AVNS_uXzQY9Qa6dWtFOMB4Lo",
  port: 25060,
  ssl: {
    rejectUnauthorized: false,
  },
};

const spacesEndpoint = new AWS.Endpoint("https://nyc3.digitaloceanspaces.com");

export const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DO_SPACES_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET,
});
