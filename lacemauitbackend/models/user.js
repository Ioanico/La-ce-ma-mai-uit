import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const recommandationSchema = new mongoose.Schema({
  link: String,
  message: String,
  lastSeen: String,
  rating: String,
  image: String,
});

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
