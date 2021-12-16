const errorController = (err, req, res, next) => {
  console.log("FROM ERROR CONTROLLER:");
  console.log("ERROR MESSAGE");
  console.log(err.message);
  console.log("ERROR NAME");
  console.log(err.name);

  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      status: "error",
      error: err.message,
    });
  } else if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({
      status: "error",
      error: err.errors[0].message,
    });
  } else if (err.name === "SequelizeDatabaseError") {
    return res.status(400).json({
      status: "error",
      error: err.message,
    });
  }

  next(err);
};

const unknownEndPoint = (req, res, next) => {
  res.status(404).send({ error: "unknown endpoint" });
};

module.exports = {
  unknownEndPoint,
  errorController,
};
