const {
  selectTopics,
  selectArticleById,
  updateArticleById,
  selectUsers,
  selectArticles,
  selectCommentsById,
  insertCommentById,
  deleteCommentById,
} = require("../models/news.model");

exports.getTopics = async (req, res, next) => {
  try {
    const topics = await selectTopics();
    res.status(200).send({ topics });
  } catch (err) {
    next(err);
  }
};

exports.getArticles = async (req, res, next) => {
  try {
    const articles = await selectArticles();
    console.log(articles);
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

exports.getUsers = async (req, res, next) => {
  try {
    const users = await selectUsers();
    res.status(200).send({ users });
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

exports.removeCommentById = async (req, res, next) => {
  const { comment_id } = req.params;
  try {
    const deleteComment = await deleteCommentById(comment_id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
