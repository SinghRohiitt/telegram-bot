# Telegram Bot 🤖😂

A Telegram bot that sends random jokes to users at configurable time intervals.  
Users can enable/disable joke delivery and control how frequently jokes are sent.  
User preferences are stored persistently using MongoDB.

---

## 🚀 Features

- Sends random jokes automatically
- Configurable joke frequency (in minutes)
- Enable / Disable joke delivery anytime
- Persistent user state using MongoDB
- Background job using cron for scalability

---

## 🧩 Tech Stack

- Node.js (ES Modules)
- Express.js
- MongoDB (Mongoose)
- Telegram Bot API
- node-cron
- Axios

---

## 🤖 Telegram Bot Details

The bot can be accessed directly on Telegram.

**Bot Username:**  
@roohhiitbot

### How to use
1. Open Telegram
2. Search for `@roohhiitbot`
3. Send `/start` to start receiving jokes
4. Use commands like `SET <minutes>`, `DISABLE`, and `ENABLE` to control delivery


## 🤖 Bot Commands

| Command | Description |
|------|-------------|
| `/start` | Register user and start joke delivery |
| `SET <minutes>` | Set joke frequency (e.g. `SET 5`) |
| `ENABLE` | Resume joke delivery |
| `DISABLE` | Pause joke delivery |

---

## ⚙️ How It Works (Simple Design)

- User commands update their state in MongoDB.
- A cron job runs every minute in the background.
- The cron job checks:
  - Whether the user is enabled
  - Whether the configured time interval has passed
- If conditions are met, a joke is fetched and sent via Telegram.

This keeps the system lightweight and scalable.

---

## 🗄️ User Data Model

Each user is stored with the following fields:

- `chatId` – Telegram chat identifier
- `isEnabled` – Controls joke delivery
- `frequency` – Joke interval in minutes
- `lastSentAt` – Timestamp of last joke sent

---

## ▶️ How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/SinghRohiitt/telegram-bot

