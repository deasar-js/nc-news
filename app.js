const express = require("express");
const {
  getTopics,
  getArticleById,
  getUsers,
} = require("./controllers/news.controller");
const {
  handleCustomErrors,
  handlePsqlError,
  handleServerErrors,
} = require("./errors/index");

const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/users", getUsers);

app.use(handleCustomErrors);
app.use(handlePsqlError);
app.use(handleServerErrors);

app.use("/*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

module.exports = app;
