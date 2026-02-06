import dotenv from "dotenv";
dotenv.config();

import cron from "node-cron";
import axios from "axios";
import TelegramBot from "node-telegram-bot-api";
import User from "../models/User.js";

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

console.log("⏱ Joke cron initialized");

// har 1 minute me chalega
cron.schedule("* * * * *", async () => {
  console.log("⏰ Cron running...");

  const users = await User.find({ isEnabled: true });

  for (const user of users) {
    const now = new Date();

    if (!user.lastSentAt) {
      await sendJoke(user);
      continue;
    }

    const diff =
      (now - user.lastSentAt) / (1000 * 60);

    if (diff >= user.frequency) {
      await sendJoke(user);
    }
  }
});

async function sendJoke(user) {
  const res = await axios.get(
    "https://official-joke-api.appspot.com/random_joke"
  );

  const joke = `${res.data.setup}\n\n${res.data.punchline}`;

  await bot.sendMessage(user.chatId, joke);

  user.lastSentAt = new Date();
  await user.save();

  console.log("😂 Joke sent to", user.chatId);
}
