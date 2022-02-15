const {
  selectTopics,
  selectArticleById,
  updateArticleById,
} = require("../models/news.model");

exports.getTopics = (req, res) => {
  selectTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};

exports.getArticleById = (req, res) => {
  const { article_id } = req.params;
  selectArticleById(article_id).then((article) => {
    res.status(200).send({ article });
  });
};

exports.patchArticleById = (req, res) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateArticleById(article_id, inc_votes).then((rows) => {
    res.status(200).send({ article: rows[0] });
  });
};
