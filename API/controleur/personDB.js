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
  const { pseudo, last_name, first_name, email, is_admin } = req.body;
  console.log(pseudo);
  const client = await pool.connect();
  try {
     await PersonModele.postPerson(
      pseudo,
      last_name,
      first_name,
      email,
      is_admin,
      client
    );
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
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
    console.error(error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};
