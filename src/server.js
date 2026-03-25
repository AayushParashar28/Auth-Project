if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const connect = require("./config/database.config");
const userRouter = require("./Route/userRoute");
const setupSwagger = require("./config/swagger");
const errorhandler = require("./middlewares/errorhandler");

const app = express();

const setupServer = async function () {
  try {
    app.use(express.json());
    app.use(userRouter);

    setupSwagger(app);

    app.use(errorhandler);

    await connect();
    console.log("Database connected");

    app.listen(4000, () => {
      console.log("App started at port 4000");
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

setupServer();
