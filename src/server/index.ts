import express from "express";
import { createAccount } from "../puppeteer/handlers/createAccount.js";
import { checkRank } from "../puppeteer/handlers/checkRank.js";
import { checkInventory } from "../puppeteer/handlers/checkInventory.js";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api/createAccount", async (req, res) => {
  const account = await createAccount();
  res.json(account);
});

app.post("/api/checkRank", async (req, res) => {
  const email = req.body.email;
  const rank = await checkRank(email);
  res.json({ rank });
});

app.post("/api/checkInventory", async (req, res) => {
  const email = req.body.email;
  const status = await checkInventory(email);
  res.json({ status });
});

app.listen(PORT);
