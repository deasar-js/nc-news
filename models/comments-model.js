const db = require("../db/connection");

exports.deleteCommentById = async (comment_id) => {
  const commentCheck = await db.query(
    "SELECT * FROM comments WHERE comment_id = $1",
    [comment_id]
  );

  if (commentCheck.rows.length === 0) {
    return Promise.reject({
      status: 400,
      msg: "Not a valid comment id",
    });
  }

  const result = await db.query(`DELETE FROM comments WHERE comment_id = $1;`, [
    comment_id,
  ]);
  return result;
};
