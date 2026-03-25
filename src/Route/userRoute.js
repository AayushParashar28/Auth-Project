const express = require("express");
const userController = require("../Controller/userController");
const { loginLimiter, signupLimiter } = require("../utils/rateLimiter");
const authMiddleware = require("../middlewares/authmiddleware");
const {
  validateSignup,
  validatelogin,
} = require("../middlewares/validationMiddleware");

const userRouter = express.Router();

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               email:
 *                 type: string
 *               Mobile:
 *                 type: string
 *               Password:
 *                 type: string
 *     responses:
 *       201:
 *         description: OTP sent to email
 *       400:
 *         description: Bad request
 */
userRouter.post(
  "/signup",
  signupLimiter,
  validateSignup,
  userController.signup,
);

/**
 * @swagger
 * /checkotp:
 *   post:
 *     summary: Verify signup OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: User verified successfully
 *       400:
 *         description: Invalid OTP
 */
userRouter.post("/checkotp", userController.checkOTP);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of all users
 */
userRouter.get("/user", authMiddleware, userController.user);

/**
 * @swagger
 * /updatedetail:
 *   put:
 *     summary: Update user mobile number
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               Mobile:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mobile updated successfully
 *       400:
 *         description: User not found
 */
userRouter.put("/updatedetail", userController.changedetail);

/**
 * @swagger
 * /deletebyemail:
 *   delete:
 *     summary: Delete user by email
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User deleted successfully
 *       400:
 *         description: User not found
 */
userRouter.delete("/deletebyemail", userController.deleteuserbyId);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               Password:
 *                 type: string
 *     responses:
 *       201:
 *         description: OTP sent to email
 *       400:
 *         description: Invalid credentials
 */
userRouter.post("/login", loginLimiter, validatelogin, userController.login);

/**
 * @swagger
 * /verifylogin:
 *   post:
 *     summary: Verify login OTP and get JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful with JWT token
 *       400:
 *         description: Invalid OTP
 */
userRouter.post("/verifylogin", userController.verifyOTP);

module.exports = userRouter;
