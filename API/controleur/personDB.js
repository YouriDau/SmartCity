const pool = require("../modele/database");
const PersonModele = require("../modele/personDB");

module.exports.getAllPersons = async (req, res) => {
  const client = await pool.connect();
  try {
    const { rows: persons } = await PersonModele.getAllPersons(client);
    const allPersons = persons[0];
    if (allPersons !== undefined) {
      res.json(allPersons);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
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
    console.error(error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

module.exports.postPerson = async (req, res) => {
  const body = req.body;
  const { pseudo, last_name, first_name, email, is_admin } = body;
  const client = await pool.connect();
  try {
    const { rows } = await PersonModele.postPerson(
      pseudo,
      last_name,
      first_name,
      email,
      is_admin,
      client
    );
    res.status(201).send(rows[0].pseudo);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

module.exports.deletePerson = async (req, res) => {
  const { pseudo } = req.body;
  const client = await pool.connect();
  try {
    await PersonModele.deletePerson(pseudo, client);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};
