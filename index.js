require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Fetching from quotes API

// Game
const gameName = process.env.TELEGRAM_GAME;
const gameURL = "https://aj-vrod.github.io/Wagon-race/"

// Commands

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const startGreeting = `Greetings, new master.
  This is your booty_bot_bot and here are some commands I can respond to:
  /help -> to see commands
  /Cmusic -> to listen to my Creator's playlist
  /showYourself -> to see my profile pic
  /game -> to start game
  `
  bot.sendMessage(chatId, startGreeting);
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "List of commands", {
    "reply_markup": {
      "keyboard": [["/Cmusic"], ["/showYourself"], ["/game"]]
    }
  })
});

bot.onText(/\/Cmusic/, (msg) => {
  const chatId = msg.chat.id;
  const url = "https://www.youtube.com/playlist?list=PLT7qNs_kSA8st0Jk1O7GVj5IHNSmnIdDm"

  bot.sendMessage(chatId, `This is my Creator's YouTube playlist. Enjoy ${url}`);
});

bot.onText(/\/showYourself/, (msg) => {
  const chatId = msg.chat.id;
  const photo = "./assets/images/Wall-E.jpg"

  bot.sendPhoto(chatId, photo, {caption: "This is me. \nAm I adorable or what?"});
});

bot.onText(/\/game/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendGame(chatId, gameName)
});

// On callbacks

bot.on('callback_query', (callbackQuery) => {
  bot.answerCallbackQuery(callbackQuery.id, { gameURL });
});

// On any message

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  if (msg.text.toString().toLowerCase().startsWith('hi')) {
    const user = msg.from.first_name;
    bot.sendMessage(chatId, `Hello, master ${user}. I'm ready to serve`)
  }

  if (msg.text.toString().toLowerCase().includes('bye')) {
    const user = msg.from.first_name;
    bot.sendMessage(chatId, `See you soon, Master ${user}`)
  }

})

// Error handling

bot.on('error', (error) => {
  console.error(error)
  return;
})
