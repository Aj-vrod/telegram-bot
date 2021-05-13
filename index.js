require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/music/, (msg) => {
  const chatId = msg.chat.id;
  const url = "https://www.youtube.com/playlist?list=PLT7qNs_kSA8st0Jk1O7GVj5IHNSmnIdDm"

  bot.sendMessage(chatId, url);
})

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Ready to serve")
})
