const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticleById,
  patchArticleById,
  getCommentsById,
  postCommentById,
} = require("../controllers/articles-controller.js");

articlesRouter.get("/", getArticles);
articlesRouter.get("/:article_id", getArticleById);
articlesRouter.patch("/:article_id", patchArticleById);
articlesRouter.get("/:article_id/comments", getCommentsById);
articlesRouter.post("/:article_id/comments", postCommentById);

module.exports = articlesRouter;
