const bcrypt = require("bcrypt");

exports.genratesalt = () => {
  const salt = bcrypt.genSaltSync(10);
  return salt;
};

exports.hashpassword = (password, salt) => {
  const hashpass = bcrypt.hashSync(password, salt);
  return hashpass;
};

exports.decodepassword = (plainpassword, hashpassword) => {
  const decode = bcrypt.compareSync(plainpassword, hashpassword);
  return decode;
};
