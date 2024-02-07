import mongoose from "mongoose";

global.mongoose = {
  conn: null,
  promise: null,
};

export const dbConnect = async () => {
  if (global.mongoose && global.mongoose.conn) {
    console.log("connected from previous");
    return global.mongoose.conn;
  } else {
    const mongoURL = process.env.MONGO_URL;

    const promise = mongoose.connect(mongoURL, {
      dbName: "FinanceAccount",
    });

    global.mongoose = {
      conn: await promise,
      promise,
    };

    console.log("Newly connected");

    return await promise;
  }
};
