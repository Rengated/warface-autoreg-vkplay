import "./server/index.js";
import "./bot/index.js";

process.on("uncaughtException", () => {
  console.log("uncaughtException");
});
process.on("unhandledRejection", () => {
  console.log("unhandledRejection");
});
