require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Commands

bot.onText(/\/mymusic/, (msg) => {
  const chatId = msg.chat.id;
  const url = "https://www.youtube.com/playlist?list=PLT7qNs_kSA8st0Jk1O7GVj5IHNSmnIdDm"

  bot.sendMessage(chatId, `This is my Creator's playlist. Enjoy ${url}`);
})

// On any message

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  if (msg.text.toString().toLowerCase().startsWith('hi')) {
    bot.sendMessage(chatId, "Hello, master. I'm ready to serve")
  }

})

// Error handling

bot.on('error', (error) => {
  console.error(error)
  return;
})
