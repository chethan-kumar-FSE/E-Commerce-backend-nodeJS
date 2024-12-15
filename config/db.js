const mongoose = require("mongoose");

class Database {
  connection = mongoose.connection;
  constructor() {
    try {
      this.connection
        .on("open", () => {
          console.log("Connection Opened");
        })
        .on("close", () => {
          console.log("connection closed");
        })
        .on("error", () => {
          console.log("something went wrong with connection");
          process.exit(1);
        });
    } catch (err) {
      console.log("err", err);
    }
  }

  async connect({ username, password, dbname }) {
    try {
      await mongoose.connect(
        `mongodb+srv://${username}:${password}@cluster0.lbx3y.mongodb.net/${dbname}`,
        {
          connectTimeoutMS: 3000,
          maxIdleTimeMS: 30000, // 30 seconds
          retryWrites: true,
          retryReads: true,
          maxPoolSize: 10,
        }
      );
    } catch (err) {
      if (err.name === "MongoParseError") {
        console.log(
          "connection string to start with 'mongodb://' or 'mongodb+srv://"
        );
      }
      if (err.code === "ENOTFOUND") {
        console.log("Cluster name is wrong");
      }
      if (err.codeName === "AtlasError") {
        console.log("Authentication Error");
      }
    }
  }
}

module.exports = new Database();
