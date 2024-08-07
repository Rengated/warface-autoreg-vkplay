import mongoose, { Schema, connect } from "mongoose";
import "dotenv/config";

const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const dbName = process.env.MONGO_DB;
const host = process.env.MONGO_HOST || "localhost";
const port = process.env.DB_PORT || "27017";

// Include authSource=admin
const connection = `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=admin`;
connect(connection!);

console.log(`Connecting to ${connection}`);

const accountSchema = new mongoose.Schema({
  password: String,
  email: String,
  firstName: String,
  surname: String,
  gender: String,
  cookies: String,
  birthDate: String,
  testing: {
    security: { type: Boolean, default: false },
    phone: { type: Boolean, default: false },
  },
  statsHidden: { type: Boolean, default: false },
  rank: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

export const Account = mongoose.model("Account", accountSchema, "request");
