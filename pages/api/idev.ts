// allow only get request

const getIdevTrackingUrl = (idev_saleamt, idev_ordernum, ip_address) => {
  // idev_saleamt total amount of the sale
  // idev_ordernum number of orders
  // ip_address IP address of the customer
  return `https://affiliates.selfpublishingtitans.com/sale.php?profile=${process.env.IDEV_PROFILE_ID}&idev_saleamt=${idev_saleamt}&idev_ordernum=${idev_ordernum}&ip_address=${ip_address}`;
};

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { idev_saleamt, idev_ordernum, ip_address } = req.query;
    const url = getIdevTrackingUrl(idev_saleamt, idev_ordernum, ip_address);
    try {
      const response = await fetch(url);
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default handler;