import { error } from "console";
import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL as string);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB Successfully Connected");
    });
    connection.on("error", (error) => {
      console.log(
        "MongoDB Connection Failed, please make sure  DB is up and running :: ",
        error
      );
      process.exit(1);
    });
  } catch (error) {
    console.log("Something went Wrong in connecting to DB");
    console.log(error);
  }
}
