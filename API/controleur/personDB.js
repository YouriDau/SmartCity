const pool = require("../modele/database");
const PersonModele = require("../modele/personDB");

module.exports.getAllPersons = async (req, res) => {
  const client = await pool.connect();
  try {
    const { rows: persons } = await PersonModele.getAllPersons(client);
    const allPersons = persons;
    if (allPersons !== undefined) {
      res.json(allPersons);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("getAllPersonsError", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

module.exports.getPerson = async (req, res) => {
  const client = await pool.connect();
  const idText = req.params.id;
  const id = parseInt(idText);

  try {
    const { rows: persons } = await PersonModele.getPerson(id, client);
    const person = persons[0];
    if (person !== undefined) {
      res.json(person);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("getPersonError", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

module.exports.postPerson = async (req, res) => {
  const { pseudo, last_name, first_name, email, is_admin, password } = req.body;
  const client = await pool.connect();
  try {
    const pseudoExist = await PersonModele.pseudoExist(pseudo, client);
    const emailExist = await PersonModele.emailExist(email, client);
    if (!pseudoExist && !emailExist) {
      await PersonModele.postPerson(
        pseudo,
        last_name,
        first_name,
        email,
        is_admin,
        password,
        client
      );
      res.sendStatus(201);
    } else {
      // 409 = conflict
      res.sendStatus(409);
    }
  } catch (error) {
    console.error("postPersonError", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

module.exports.updatePerson = async (req, res) => {
  const { id, pseudo, last_name, first_name, email, is_admin, password } = req.body;
  const client = await pool.connect();
  try {
    if (!isNaN(id)) {
      await PersonModele.updatePerson(
        id,
        pseudo,
        last_name,
        first_name,
        email,
        is_admin,
        password,
        client
      );
      res.sendStatus(204);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error("updatePersonError", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

module.exports.deletePerson = async (req, res) => {
  const { id } = req.body;
  const client = await pool.connect();

  try {
    await PersonModele.deletePerson(id, client);
    res.sendStatus(204);
  } catch (error) {
    console.error("deletePersonError", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};
