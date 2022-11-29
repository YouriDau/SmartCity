const bcrypt = require("bcrypt");

module.exports.getAllPersons = async (client) => {
  return await client.query("SELECT * FROM person");
};

module.exports.getPersonById = async (client, id) => {
  return await client.query("SELECT * FROM person WHERE id=$1", [id]);
};

module.exports.getPerson = async (client, pseudo) => {
  return await client.query("SELECT * FROM person WHERE pseudo=$1 LIMIT 1", [
    pseudo,
  ]);
};

module.exports.postPerson = async (
  client,
  pseudo,
  lastName,
  firstName,
  email,
  password
) => {
  return await client.query(
    `INSERT INTO person(pseudo, last_name, first_name, email, is_admin, password)
     VALUES ($1,$2,$3,$4,$5,$6)`,
    [pseudo, lastName, firstName, email, false, password]
  );
};

module.exports.updatePerson = async (
  client,
  id,
  pseudo,
  lastName,
  firstName,
  email,
  password
) => {
  return await client.query(
    `UPDATE person 
     SET pseudo=$1, last_name=$2, first_name=$3, email=$4, is_admin=$5, password=$6 
     WHERE id=$7`,
    [pseudo, lastName, firstName, email, false, password, id]
  );
};

module.exports.deletePerson = async (client, id) => {
  return await client.query("DELETE FROM person WHERE id = $1", [id]);
};

// Check if the pseudo is used
module.exports.pseudoExist = async (client, pseudo) => {
  const { rows } = await client.query(
    `SELECT count(pseudo) AS nbr FROM person WHERE pseudo=$1`,
    [pseudo]
  );
  return rows[0].nbr > 0;
};

module.exports.emailExist = async (client, email) => {
  const { rows } = await client.query(
    `SELECT count(email) AS nbr FROM person WHERE email=$1`,
    [email]
  );
  return rows[0].nbr > 0;
};

module.exports.getUser = async (client, pseudo, password) => {
  try {
    const { rows: personRows } = await this.getPerson(client, pseudo);
    const person = personRows[0];
    if (
      person !== undefined &&
      (await bcrypt.compare(password, person.password))
    ) {
      if (person.is_admin) {
        return { userType: "admin", value: person };
      } else {
        return { userType: "user", value: person };
      }
    } else {
      return { userType: "unknow", value: null };
    }
  } catch (error) {
    console.error("getUserError", error);
  }
};
