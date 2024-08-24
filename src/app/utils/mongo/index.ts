import mongoose from "mongoose";

const dbConnect = (): void => {
  try {
    mongoose.connect(<string>process.env.MONGODB_URI);
    console.log("Connected successfully");
  } catch (err) {
    console.log(err);
  }
};

export { dbConnect };
