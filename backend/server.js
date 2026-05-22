const express = require("express");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/authRoutes");

const leadRoutes = require("./routes/leadRoutes");

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/leads", leadRoutes);

app.listen(5000, () => {
  console.log("Server Running");
});