const mongoose = require("mongoose");

const DataBaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    const db = mongoose.connection;

    db.on("open", () => {
      console.log("MongoDB Connected Successfully");
    });

    db.on("error", (error) => {
      console.log("MongoDB Connection Error " + error);
    });

    db.on("disconnected", () => {
      console.log("MongoDB Disconnected");
    });

    process.on("SIGINT", async () => {
      try {
        await db.close();
        console.log("MongoDB connection closed through app termination");
        process.exit(0);
      } catch (error) {
        console.error("Error during MongoDB disconnection", error);
        process.exit(1);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = DataBaseConnection