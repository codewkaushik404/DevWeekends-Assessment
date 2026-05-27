const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Server is healthy"));
app.use("/api/notes", require("./routes/noteRoutes"));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});