import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    try {
      const statue = "enabled";
      const response = await axios.post(
        `${process.env.EMAIL_SERVER_ENDPOINT}/api/subscribers`,
        {
          email,
          name,
          statue,
          lists: [3],
        },
        {
          auth: {
            username: process.env.EMAIL_SERVER_USERNAME,
            password: process.env.EMAIL_SERVER_PASSWORD,
          },
        }
      );
      if (response.status === 200) {
        return res.status(200).json({ status: "Successful", error: "" });
      } else {
        return res
          .status(400)
          .json({ statue: "Unsuccessful", error: "Something went wrong" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message || error.toString() });
    }
  }
}
