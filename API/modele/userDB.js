const PersonModel = require("./personDB");
const { compareHash } = require("../utils/utils");

module.exports.getUser = async (client, pseudo, password) => {
  try {
    const { rows: personRows } = await PersonModel.getPerson(client, pseudo);
    const person = personRows[0];
    if (
      person !== undefined &&
      (await compareHash(password, person.password))
    ) {
      if (person.isAdmin) {
        return { userType: "admin", value: person };
      } else {
        return { userType: "user", value: person };
      }
    } else {
      return { userType: "unknow", value: null };
    }
  } catch (error) {
    console.error;
  }
};
