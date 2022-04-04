const cors = require("cors");
const express = require("express");

const {
  handleCustomErrors,
  handlePsqlError,
  handleServerErrors,
} = require("./errors/index");

const app = express();
const apiRouter = require("./routes/api-router.js");

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.use(handleCustomErrors);
app.use(handlePsqlError);
app.use(handleServerErrors);

app.use("*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

module.exports = app;
