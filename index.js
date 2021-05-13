require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Commands

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const startGreeting = `Greetings, new master.
  This is your booty_bot_bot and here are some commands I can respond to:
  '/help' -> to see commands
  '/Cmusic' -> to listen to my Creator's playlist
  '/showYourself' -> to see my profile pic
  `
  bot.sendMessage(chatId, startGreeting);
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "List of commands", {
    "reply_markup": {
      "keyboard": [["/Cmusic"], ["showYourself"]]
    }
  })
});

bot.onText(/\/Cmusic/, (msg) => {
  const chatId = msg.chat.id;
  const url = "https://www.youtube.com/playlist?list=PLT7qNs_kSA8st0Jk1O7GVj5IHNSmnIdDm"

  bot.sendMessage(chatId, `This is my Creator's playlist. Enjoy ${url}`);
});

bot.onText(/\/showYourself/, (msg) => {
  const chatId = msg.chat.id;
  const photo = "./assets/images/Wall-E.jpg"

  bot.sendPhoto(chatId, photo, {caption: "This is me. \nAm I adorable or what?"});
});

// On any message

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  if (msg.text.toString().toLowerCase().startsWith('hi')) {
    bot.sendMessage(chatId, "Hello, master. I'm ready to serve")
  }

  if (msg.text.toString().toLowerCase().includes('bye')) {
    bot.sendMessage(chatId, "See you soon, Master")
  }

})

// Error handling

bot.on('error', (error) => {
  console.error(error)
  return;
})
