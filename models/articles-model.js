const db = require("../db/connection");

exports.selectArticles = async (
  sort_by = "created_at",
  order = "desc",
  topic
) => {
  let queryStr = `SELECT articles.*, 
    COUNT(comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments 
    ON articles.article_id = comments.article_id`;

  const topicArr = [];

  if (topic) {
    const checkTopicExists = await db.query(
      `SELECT * FROM topics WHERE slug = $1;`,
      [topic]
    );
    if (checkTopicExists.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Topic not found" });
    }
    topicArr.push(topic);
    queryStr += ` WHERE topic = $1`;
  }

  queryStr += `
    GROUP BY articles.article_id
    ORDER BY ${sort_by} ${order};`;

  const { rows } = await db.query(queryStr, topicArr);
  return rows;
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
