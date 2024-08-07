import TelegramBot from "node-telegram-bot-api";
import { createAccount } from "../puppeteer/handlers/createAccount.js";

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN!, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Привет, чтобы зарегестрировать аккаунт, введи комманду /createAccount");
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (msg.text == "/createAccount") {
    const account = await createAccount();
    await bot.sendMessage(msg.chat.id, JSON.stringify(account));
  }
});
