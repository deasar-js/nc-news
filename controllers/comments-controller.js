const { deleteCommentById } = require("../models/comments-model.js");

exports.removeCommentById = async (req, res, next) => {
  const { comment_id } = req.params;
  try {
    const deleteComment = await deleteCommentById(comment_id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
