import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { Domain, ChartAsin } = req.query;
    const token = req.headers['x-app-token']
    
    if(!token || token!=process.env.KEEPA_SECRET){
      res.status(403).send("unauthorized")
      return;
    }

    const keepaKey = process.env.KEEPA_KEY;  
    if (!keepaKey) {
      throw new Error('Missing Keepa API key');
    }

    const keepaRes = await fetch(`https://api.keepa.com/product?key=${keepaKey}&domain=${Domain}&stats=365&buybox=1&history=1&offers=20&asin=${ChartAsin}`)
    
    if (!keepaRes.ok) {
      throw new Error(`Keepa API request failed with status ${keepaRes.status}`);
    }

    const data = await keepaRes.json(); 
    if (!data) {
      throw new Error('Failed to parse JSON from Keepa API response');
    }

    res.status(200).json({...data})
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal server error');
  }
}