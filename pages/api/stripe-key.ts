export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({
      publishableKey: process.env.PUBLIC_STRIPE_PUBLISHABLE_KEY,
    });
  } else {
    res.status(405).end("Method Not Allowed");
  }
}
