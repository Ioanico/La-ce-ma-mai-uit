import mongoose, { connection } from "mongoose";

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(process.env.MONGO_URI, connectionParams);
    console.log("connected to db");
  } catch (error) {
    console.log(error);
    console.log("couldtn connect");
  }
};
