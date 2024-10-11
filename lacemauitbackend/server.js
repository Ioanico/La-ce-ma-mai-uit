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

const mongo_uri = process.env.MONGO_URI;

mongoose.connect(mongo_uri, { dbName: "lacemauit" });

app.get("/", (req, res) => {
  res.json("merge get");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (err) {
          res.json("passwrod no good");
        }
        if (response) {
          res.json("success");
        }
      });
    } else {
      res.json("no such user");
    }
  });
});

app.post("/register", (req, res) => {
  const { name, password, email } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      UserModel.create({ name, email, password: hash })
        .then((users) => res.json(users))
        .catch((err) => res.json(err));
    })
    .catch((err) => console.log(err.message));
});

app.listen(port, () => {
  console.log("app is running on port 3000");
});
