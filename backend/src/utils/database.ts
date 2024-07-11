import mongoose, { connect, ConnectOptions } from "mongoose";

const mongoURL: string = process.env.MONGODB_URL || "";


mongoose.set("strictQuery", true);

interface IConnectOptions extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

const options: IConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const db = {
  connect: () => {
    connect(mongoURL, options);
    mongoose.connection.on("error", (err) => {
      console.log("MongoDB connection error: " + err);
      process.exit(-1);
    });

    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
    });
  },
};

export default db;