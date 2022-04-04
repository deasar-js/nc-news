commentsRouter = require("express").Router();
const { removeCommentById } = require("../controllers/comments-controller.js");

commentsRouter.delete("/:comment_id", removeCommentById);

module.exports = commentsRouter;
