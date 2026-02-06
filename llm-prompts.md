# LLM Prompts Used – Task 2 (Telegram Joke Bot)

During development, I used LLM tools (ChatGPT) to assist with planning, debugging, and validating the implementation. Below are the exact prompts used.

---

## Prompt 1: Project Design

"Design a simple and scalable Telegram bot that sends jokes to users at configurable intervals. The bot should support enable/disable functionality and store user preferences in MongoDB."

---

## Prompt 2: Cron Job Logic

"How can I use a cron job in Node.js to send messages to users at different time intervals based on values stored in a database?"

---

## Prompt 3: Frequency Handling

"How do I check if a certain number of minutes have passed since the last action using JavaScript Date objects?"

---

## Prompt 4: Enable / Disable Flow

"Design a clean way to enable and disable background jobs for users using a database flag instead of stopping the cron job."

---

## Prompt 5: MongoDB Schema Design

"Suggest a MongoDB schema for a Telegram bot that needs to store chat ID, message frequency, enabled/disabled state, and last sent timestamp."

---

## Prompt 6: ESM and Environment Variable Debugging

"I am facing issues with dotenv and ES modules in Node.js where environment variables are undefined. How can I correctly load environment variables in an ESM-based project?"

---

## Prompt 7: Telegram Bot Commands

"How can I implement Telegram bot commands like /start, SET <minutes>, ENABLE, and DISABLE using node-telegram-bot-api?"

---

## Prompt 8: Final Review

"Review my Telegram bot architecture and suggest improvements while keeping the implementation simple and scalable for a hackathon project."

---

All generated suggestions were reviewed, adapted, and manually implemented.
