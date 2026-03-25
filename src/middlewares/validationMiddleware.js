const { signupValidation, loginValidation } = require("../utils/validation");

const validateSignup = (req, res, next) => {
  const { error } = signupValidation.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      success: false,
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};

const validatelogin = (req, res, next) => {
  const { error } = loginValidation.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      success: false,
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};

module.exports = { validateSignup, validatelogin };
