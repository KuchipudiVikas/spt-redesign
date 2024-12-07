export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing URL" });
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3; compatible; Googlebot/2.1; +http://www.google.com/bot.html",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();

    return res.status(200).json({ html });
  } catch (error) {
    console.error("Error fetching link preview:", error);
    return res.status(500).json({ error: "Failed to fetch link preview" });
  }
}
