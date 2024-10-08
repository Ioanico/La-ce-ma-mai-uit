import express, { json } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import UserModel from "./models/user.js";

dotenv.config();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const mongo_uri = process.env.MONGO_URI;

mongoose.connect(mongo_uri, { dbName: "lacemauit" });

app.get("/", (req, res) => {
  res.json("merge get");
});

app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.listen(port, () => {
  console.log("app is running on port 3000");
});
