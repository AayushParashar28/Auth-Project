const Joi = require("joi");

const signupValidation = Joi.object({
  Name: Joi.string().min(3).max(50).required().messages({
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must be less than 50 Character",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email",
    "any.required": "Email is required",
  }),
  Mobile: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.length": "Mobile must be 10 digits",
      "string.pattern.base": "Mobile must contain only numbers",
      "any.required": "Mobile is required",
    }),
  Password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),
});

const loginValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email",
    "any.required": "Email is required",
  }),
  Password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

module.exports = { signupValidation, loginValidation };
