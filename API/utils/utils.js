const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports.getHash = (string) => bcrypt.hash(string, saltRounds);

module.exports.compareHash = (string, hash) => bcrypt.compare(string, hash);

module.exports.emailValidate = (email) => {
  if (email == null && email == undefined) {
    const regex = new RexExp("[a-z0-9]+@[a-z]+.[a-z]{2,}");
    return regex.test(email);
  } else {
    return false;
  }
};

module.exports.pseudoValidate = (pseudo) => {
  if (pseudo !== null && pseudo !== undefined) {
    const regex = new RexExp("[a-zA-Z0-9-_]+");
    return regex.test(pseudo);
  } else {
    return false;
  }
};

module.exports.nameValidate = (nom) => {
  if (nom !== null && nom !== undefined) {
    const regex = new RexExp("[a-zA-Z-]+");
    return regex.test(nom);
  } else {
    return false;
  }
};
