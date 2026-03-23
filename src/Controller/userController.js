const userModel = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const passwordhelper = require("../utils/passwordhelper");
const { sendOTP } = require("../config/emailServices");

exports.signup = async (req, res) => {
  try {
    const User = {
      Name: req.body.Name,
      email: req.body.email,
      Mobile: req.body.Mobile,
      Password: req.body.Password,
    };

    if (!User.Name || !User.email || !User.Mobile || !User.Password) {
      return res.status(400).json({
        msg: "All Feild are required",
      });
    }

    const existingUser = await userModel.findOne({ email: User.email });
    if (existingUser) {
      return res.status(400).json({
        msg: "User email already existed",
      });
    }

    const salt = passwordhelper.genratesalt();
    User.Password = passwordhelper.hashpassword(User.Password, salt);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    User.otp = otp;
    User.otpExpiry = otpExpiry;
    User.isVerified = false;

    if (!existingUser) {
      const result = await userModel.create(User);

      await sendOTP(User.email, otp);

      return res.status(201).json({
        sucess: true,
        msg: "OTP sent to your email please verify",
        response: result,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server error",
    });
  }
};

exports.checkOTP = async (req, res) => {
  try {
    const email = req.body.email;
    const otp = req.body.otp;

    const checkUser = await userModel.findOne({ email: email });
    if (!checkUser) {
      return res.status(400).json({
        msg: "User email Not Valid",
      });
    }

    if (checkUser.otp !== otp) {
      return res.status(400).json({
        msg: "OTP Invalid",
      });
    }

    if (checkUser.otpExpiry < new Date()) {
      return res.status(200).json({
        msg: "OTP Expired. Please Signin again",
      });
    }

    await userModel.updateOne(
      { email: email },
      { $set: { isVerified: true, otp: null, otpExpiry: null } },
    );

    return res.status(200).json({
      msg: "User Verified Successfully! You can now login.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server error",
    });
  }
};

exports.user = async (req, res) => {
  try {
    const user = await userModel.find();
    const count = await userModel.estimatedDocumentCount();

    return res.status(200).json({
      sucess: true,
      "Total Count of user": count,
      response: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server error",
    });
  }
};

exports.changedetail = async (req, res) => {
  try {
    const email = req.body.email;
    const newMobile = req.body.Mobile;

    const result = await userModel.findOne({ email: email });
    if (!result) {
      return res.status(400).json({
        msg: "User email Not Valid",
      });
    }

    if (result) {
      const update = await userModel.updateOne(
        { email: email },
        { $set: { Mobile: newMobile } },
      );
      return res.status(201).json({
        sucess: true,
        response: update,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server error",
    });
  }
};

exports.deleteuserbyId = async (req, res) => {
  try {
    const email = req.body.email;

    const result = await userModel.deleteOne({ email: email });

    return res.status(201).json({
      sucess: true,
      msg: "User deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, Password } = req.body;

    if (!email || !Password) {
      return res.status(400).json({
        msg: " All feilds required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "User Not Found",
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        msg: "User not verified, Please verify user first",
      });
    }

    const checkpassword = passwordhelper.decodepassword(
      Password,
      user.Password,
    );
    if (!checkpassword) {
      return res.status(400).json({
        msg: "Given password is wrong",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    await userModel.updateOne(
      { email: email },
      { $set: { otp: otp, otpExpiry: otpExpiry } },
    );

    await sendOTP(email, otp);

    return res.status(201).json({
      msg: "OTP sent to you'r email Please verify",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "Internal Server Error",
    });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const email = req.body.email;
    const otp = req.body.otp;

    const checkUser = await userModel.findOne({ email: email });
    if (!checkUser) {
      return res.status(400).json({
        msg: "User email Not Valid",
      });
    }

    if (checkUser.otp !== otp) {
      return res.status(400).json({
        msg: "OTP Invalid",
      });
    }

    if (checkUser.otpExpiry < new Date()) {
      return res.status(200).json({
        msg: "OTP Expired. Please Signin again",
      });
    }

    await userModel.updateOne(
      { email: email },
      { $set: { otp: null, otpExpiry: null } },
    );

    const token = jwt.sign(
      { id: checkUser._id, email: checkUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    return res.status(200).json({
      success: true,
      msg: "Login successful",
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server error",
    });
  }
};
