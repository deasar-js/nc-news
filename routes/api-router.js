const apiRouter = require("express").Router();

const topicsRouter = require("./topics-router.js");
const articlesRouter = require("./articles-router.js");
const commentsRouter = require("./comments-router.js");
const usersRouter = require("./users-router.js");
const { getEndpoints } = require("../controllers/api-controller.js");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/users", usersRouter);
// apiRouter.route("/").get((req, res) => res.send({ endpoints: allEndpoints }));
apiRouter.get("/", getEndpoints);

module.exports = apiRouter;
