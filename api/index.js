const express = require("express");
const app = express();

app.use(express.json());

let orders = [];

app.get("/", (req, res) => {
  res.json({ status: "GADA system running" });
});

app.post("/orders", (req, res) => {
  const order = {
    id: Date.now(),
    chain: req.body.chain,
    branch: req.body.branch,
    city: req.body.city,
    address: req.body.address,
    notes: req.body.notes,
    status: "new",
    pallets: 0,
    createdAt: new Date()
  };

  orders.push(order);
  res.json(order);
});

app.get("/orders", (req, res) => {
  res.json(orders);
});

app.patch("/orders/:id", (req, res) => {
  const order = orders.find(o => o.id == req.params.id);

  if (!order) return res.status(404).json({ error: "not found" });

  order.status = req.body.status || order.status;
  order.pallets = req.body.pallets ?? order.pallets;

  res.json(order);
});

module.exports = app;
