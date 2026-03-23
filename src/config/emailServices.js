const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: " gmail",
  auth: {
    user : process.env.GMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const sendOTP = async (email , otp) => {
  await transporter.sendMail({
    from : "ayushparashar6203@gmail.com",
    to : email,
    subject: "Your OTP for Signup Verification",
    text:`Your OTP is: ${otp}. It expires in 5 minutes.`
  });
};

module.exports = { sendOTP};