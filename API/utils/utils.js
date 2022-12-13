const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports.getHash = (string) => bcrypt.hash(string, saltRounds);

module.exports.compareHash = (string, hash) => bcrypt.compare(string, hash);

module.exports.emailValidate = (email) => {
  const regex = new RegExp("^[a-zA-Z0-9_.]+@[a-z]+.[a-z]{2,4}$");
  return regex.test(email);
};

module.exports.pseudoValidate = (pseudo) => {
  return pseudo.length <= 250;
};
