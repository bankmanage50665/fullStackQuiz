const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const userRouter = require("./routes/user_routes");
const questionRouter = require("./routes/question_router");

const url =
  "mongodb+srv://rahul1234:sKKlTG745dco9r5P@cluster0.wdrbduw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    ),
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // End the request with a 200 status for preflight
  }

  next();
});

app.use("/uploads/images", express.static(path.join("uploads", "images")));
app.use("/users", userRouter);
app.use("/questions", questionRouter);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  res.status(err.code || 500);
  res.json({
    message: err.message || "Something went wrong, Please try again later.",
  });
});

mongoose
  .connect(url)
  .then((req, res) => {
    app.listen(80);
  })
  .catch((err) => {
    console.log(err);
  });
