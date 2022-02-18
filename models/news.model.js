const db = require("../db/connection");

exports.selectTopics = async () => {
  const result = await db.query("SELECT * FROM topics;");
  return result.rows;
};

exports.selectArticles = async () => {
  const result = await db.query(
    `SELECT articles.*, 
    COUNT(comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id
    GROUP BY articles.article_id;`
  );
  return result.rows;
};

exports.selectArticleById = async (id) => {
  const result = await db.query(
    `SELECT articles.*, 
      COUNT(comments.article_id) AS comment_count
        FROM articles 
        LEFT JOIN comments
        ON articles.article_id = comments.article_id 
        WHERE articles.article_id = $1
        GROUP BY articles.article_id;`,
    [id]
  );
  if (result.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Article not found" });
  }
  return result.rows[0];
};

exports.updateArticleById = async (article_id, inc_votes) => {
  const result = await db.query(
    `UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING *;`,
    [inc_votes, article_id]
  );

  if (result.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Article Not Found" });
  } else {
    return result.rows[0];
  }
};

exports.selectUsers = async () => {
  const result = await db.query("SELECT * FROM users;");
  return result.rows;
};

exports.selectCommentsById = async (article_id) => {
  const result = await db.query(
    `SELECT * FROM comments
    WHERE article_id = $1;`,
    [article_id]
  );

  if (result.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Comments not found" });
  } else {
    return result.rows;
  }
};

exports.insertCommentById = async (article_id, username, body) => {
  const result = await db.query(
    `INSERT INTO comments
    (body, article_id, author)
    VALUES
    ($1, $2, $3)
    RETURNING *;`,
    [body, article_id, username]
  );

  if (result.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Failed not found" });
  }
  return result.rows[0];
};

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
