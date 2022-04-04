const {
  selectArticles,
  selectArticleById,
  updateArticleById,
  selectCommentsById,
  insertCommentById,
} = require("../models/articles-model.js");

exports.getArticles = async (req, res, next) => {
  const { sort_by, order, topic } = req.query;
  try {
    const articles = await selectArticles(sort_by, order, topic);
    res.status(200).send({ articles });
  } catch (err) {
    next(err);
  }
};

exports.getArticleById = async (req, res, next) => {
  const { article_id } = req.params;

  try {
    const article = await selectArticleById(article_id);
    res.status(200).send({ article });
  } catch (err) {
    next(err);
  }
};

exports.patchArticleById = async (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  try {
    const article = await updateArticleById(article_id, inc_votes);
    res.status(200).send({ article });
  } catch (err) {
    next(err);
  }
};

exports.getCommentsById = async (req, res, next) => {
  const { article_id } = req.params;
  try {
    const comments = await selectCommentsById(article_id);
    res.status(200).send({ comments });
  } catch (err) {
    next(err);
  }
};

exports.postCommentById = async (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  try {
    const comment = await insertCommentById(article_id, username, body);
    res.status(200).send({ comment });
  } catch (err) {
    next(err);
  }
};
