import dotenv from "dotenv";
dotenv.config();

import TelegramBot from "node-telegram-bot-api";
import User from "../models/User.js";

const token = process.env.TELEGRAM_BOT_TOKEN;
// console.log("TOKEN 👉", process.env.TELEGRAM_BOT_TOKEN);
// polling mode (simple & hackathon-safe)
const bot = new TelegramBot(token, { polling: true });

/* ---------------- HELP MENU ---------------- */
const HELP_TEXT = `
❓ Unsupported command.

Available commands:
• /start – Start receiving jokes
• SET <minutes> – Set joke frequency (e.g. SET 5)
• ENABLE – Enable joke delivery
• DISABLE – Disable joke delivery
`;

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
    "Welcome! 🎉\nI will send you jokes every 1 minute.\n\nCommands:\nSET <minutes>\nENABLE\nDISABLE",
  );
});

// ENABLE command
bot.onText(/ENABLE/i, async (msg) => {
  const chatId = msg.chat.id.toString();

  const user = await User.findOne({ chatId });

  if (user && user.isEnabled) {
    return bot.sendMessage(chatId, "ℹ️ Joke delivery is already enabled.");
  }

  await User.findOneAndUpdate({ chatId }, { isEnabled: true });

  bot.sendMessage(chatId, "✅ Joke delivery enabled");
});

// DISABLE command
bot.onText(/DISABLE/i, async (msg) => {
  const chatId = msg.chat.id.toString();

  const user = await User.findOne({ chatId });

  if (user && !user.isEnabled) {
    return bot.sendMessage(chatId, "ℹ️ Joke delivery is already disabled.");
  }

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

/* ---------------- FALLBACK / HELP ---------------- */
bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id.toString();

  // ignore valid commands
  const validPatterns = [/^\/start/i, /^ENABLE/i, /^DISABLE/i, /^SET \d+/i];

  const isValid = validPatterns.some((regex) => regex.test(text));
  if (!isValid) {
    bot.sendMessage(chatId, HELP_TEXT);
  }
});

export default bot;
