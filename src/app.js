import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// 👇 required for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 👇 FORCE load .env from project root
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

import express from "express";
import connectDB from "./config/db.js";
import "./bot/telegram.js";
import "./cron/jokeCron.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

await connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
