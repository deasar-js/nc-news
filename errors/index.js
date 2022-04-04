exports.notFound = (req, res) => {
  res.status(404).send("Not a route");
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handlePsqlError = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid input" });
  } else if (err.code === "42601") {
    res.status(400).send({ msg: "Not valid query" });
  } else if (err.code === "23503") {
    res.status(400).send({ msg: "User doesn't exist" });
  } else {
    next(err);
  }
};

exports.handleServerErrors = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error!" });
};
