require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/auth.routes");
const sweetsRoutes = require("./routes/sweets.routes");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetsRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

module.exports = app;
