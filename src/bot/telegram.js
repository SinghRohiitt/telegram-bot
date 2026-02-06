import dotenv from "dotenv";
dotenv.config();

import TelegramBot from "node-telegram-bot-api";
import User from "../models/User.js";

const token = process.env.TELEGRAM_BOT_TOKEN;
// console.log("TOKEN 👉", process.env.TELEGRAM_BOT_TOKEN);
// polling mode (simple & hackathon-safe)
const bot = new TelegramBot(token, { polling: true });

// console.log("🤖 Telegram bot started");

// /start command
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id.toString();

  await User.findOneAndUpdate(
    { chatId },
    { chatId, isEnabled: true, frequency: 1 },
    { upsert: true },
  );

  bot.sendMessage(
    chatId,
    "Welcome! 🎉\nI will send you jokes every 1 minute.\nYou can use:\nENABLE\nDISABLE\nSET <minutes>",
  );
});

// ENABLE command
bot.onText(/ENABLE/i, async (msg) => {
  const chatId = msg.chat.id.toString();

  await User.findOneAndUpdate({ chatId }, { isEnabled: true });

  bot.sendMessage(chatId, "✅ Joke delivery enabled");
});

// DISABLE command
bot.onText(/DISABLE/i, async (msg) => {
  const chatId = msg.chat.id.toString();

  await User.findOneAndUpdate({ chatId }, { isEnabled: false });

  bot.sendMessage(chatId, "⏸ Joke delivery disabled");
});

// SET <n> command
bot.onText(/SET (\d+)/i, async (msg, match) => {
  const chatId = msg.chat.id.toString();
  const minutes = Number(match[1]);

  if (minutes < 1) {
    return bot.sendMessage(chatId, "❌ Frequency must be at least 1 minute");
  }

  await User.findOneAndUpdate({ chatId }, { frequency: minutes });

  bot.sendMessage(chatId, `⏱ Frequency set to ${minutes} minutes`);
});

export default bot;
