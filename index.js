const TelegramApi = require("node-telegram-bot-api");
const messages = require("./constants");
// const { gameOptions, againOptions } = require("./options");
// const sequelize = require("./db");
//const UserModel = require("./models");

const token = "5982583507:AAFUM7gv764bNL3xFJP7K3iEHrpExa8oXq4";

const bot = new TelegramApi(token, { polling: true });

const chats = {};

const start = async () => {
  //   try {
  //     // await sequelize.authenticate();
  //     // await sequelize.sync();
  //   } catch (e) {
  //     console.log("Подключение к бд сломалось", e);
  //   }

  bot.setMyCommands([
    { command: "/start", description: "Начальное приветствие" },
    { command: "/get", description: "Хочу в клуб" },
    { command: "/help", description: "Нужна помощь" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    console.log(msg);

    try {
      if (text === "/start") {
        // await UserModel.create({ chatId });

        return bot.sendMessage(chatId, messages[text]);
      }

      if (text === "/get") {
        chats[msg.from.id] = true;

        return bot.sendMessage(chatId, messages[text]);
      }

      if (text === "/help") {
        chats[msg.from.id] = true;
        return bot.sendMessage(chatId, messages[text]);
      }

      if (chats[msg.from.id]) {
        return bot.sendMessage(chatId, text);
      }

      return bot.sendMessage(chatId, "Я тебя не понимаю, попробуй еще раз!)");
    } catch (e) {
      return bot.sendMessage(chatId, "Произошла какая то ошибка!");
    }
  });

  //   bot.on("callback_query", async (msg) => {
  //     const data = msg.data;
  //     const chatId = msg.message.chat.id;
  //     if (data === "/again") {
  //       return startGame(chatId);
  //     }
  //     const user = await UserModel.findOne({ chatId });
  //     if (data == chats[chatId]) {
  //       user.right += 1;
  //       await bot.sendMessage(
  //         chatId,
  //         `Поздравляю, ты отгадал цифру ${chats[chatId]}`,
  //         againOptions
  //       );
  //     } else {
  //       user.wrong += 1;
  //       await bot.sendMessage(
  //         chatId,
  //         `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`,
  //         againOptions
  //       );
  //     }
  //     await user.save();
  //   });
};

start();
