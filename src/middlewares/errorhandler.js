const errorhandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === "Validation Error") {
    return res.status(400).json({
      success: false,
      msg: Object.values(err.error).map((e) => e.message),
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      msg: "Duplicate Value Entered",
    });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      msg: "Invalid Token",
    });
  }

  return res.status(err.status || 500).json({
    success: false,
    msg: err.message || "Internal Server Error",
  });
};

module.exports = errorhandler;
