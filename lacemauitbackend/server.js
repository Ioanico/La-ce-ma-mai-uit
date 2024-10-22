import express, { json } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import UserModel from "./models/user.js";
import bcrypt from "bcrypt";

dotenv.config();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("merge get");
});

app.listen(port, () => {
  console.log("app is running on port 3000");
});
