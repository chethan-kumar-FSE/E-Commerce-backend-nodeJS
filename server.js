require("dotenv").config();
console.log("df", process.env.MONGOOSE_DBNAME);
const express = require("express");
const cors = require("cors");
const Database = require("./config/db");

const app = express();
const userRouter = require("./routes/userRoutes");
const PORT = process.env.PORT || 3001;
//mongoose connection
Database.connect({
  username: process.env.MONGOOSE_USERNAME,
  password: process.env.MONGOOSE_PASSWORD,
  dbname: process.env.MONGOOSE_DBNAME,
});

app.disable("x-powered-by");

app.use(
  cors({
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    optionsSuccessStatus: 200,
    origin: [`http://localhost:${process.env.PORT}`],
    credentials: true, //used for cross origin request that rely on cookies,authentication headers
    exposedHeaders: ["Content-Length"],
    maxAge: 3600,
  })
);

app.use(express.json());
app.use("/api/v1", userRouter);

app.use((err, req, res, next) => {
  console.log("errr", err);
  const statusCode = err?.errorCode || 500;
  const message = err?.message || "Internal Server Error";
  const errors = err?.errors;

  const responseBody = {
    status: "failure",
    message,
    ...(errors ? { errors } : {}),
  };
  return res.status(statusCode).json(responseBody);
});

app.listen(PORT, () => {
  console.log(`connected to post : ${PORT}`);
});
