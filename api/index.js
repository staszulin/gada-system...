let orders = [];

module.exports = (req, res) => {

  const { method, url } = req;

  // בדיקה שהמערכת חיה
  if (url === "/") {
    return res.json({ status: "GADA system running" });
  }

  // יצירת הזמנה
  if (url === "/orders" && method === "POST") {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const data = JSON.parse(body || "{}");

      const order = {
        id: Date.now(),
        chain: data.chain,
        branch: data.branch,
        city: data.city,
        address: data
