exports.notFound = (req, res) => {
  res.status(404).send("Not a bloody route");
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    console.log(err);
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handlePsqlError = (err, req, res, next) => {
  console.log(err.code);
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid input" });
  } else if (err.code === "23503") {
    res.status(400).send({ msg: "User doesn't exist" });
  } else {
    next(err);
  }
};

exports.handleServerErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error!" });
};
