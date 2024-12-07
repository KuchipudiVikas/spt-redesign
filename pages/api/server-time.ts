// pages/api/server-time.js
export default function handler(req, res) {
  const serverTime = new Date().toISOString(); // or format as needed
  res.status(200).json({ serverTime });
}
