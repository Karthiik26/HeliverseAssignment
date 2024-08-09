const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoDbConnection = require("./Config/Db");
const cookieparser = require("cookie-parser");
const PORT = process.env.SERVER_PORT;
const Router = require("./Router/index");

app.use(express.json());
app.use(cookieparser());

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Default route
app.get("/", (req, res) => {
  res.json({
    message: "Connected At Home",
  });
});

// api end points
app.use("/FullStack", Router);

MongoDbConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server Running At " + PORT);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  });
