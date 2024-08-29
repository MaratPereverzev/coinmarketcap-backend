import mongoose from "mongoose";

const dbConnect = async (): Promise<void> => {
  try {
    await mongoose.connect(<string>process.env.MONGODB_URI);
    console.log("connected to mongodb");
  } catch (err) {
    console.log(err);
  }
};

export { dbConnect };
