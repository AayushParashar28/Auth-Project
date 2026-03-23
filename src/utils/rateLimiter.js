const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    msg: "Too Many login attempts, Please login after 15 minutes",
  },
});

const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    msg: "Too many accounts created, please try after 1 hour",
  },
});

module.exports = { loginLimiter, signupLimiter };
