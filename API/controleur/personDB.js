const pool = require("../modele/database");
const PersonModele = require("../modele/personDB");
const jwt = require("jsonwebtoken");
const { getHash } = require("../utils/utils");

module.exports.getAllPersons = async (req, res) => {
  const client = await pool.connect();
  try {
    const { rows: persons } = await PersonModele.getAllPersons(client);
    const allPersons = persons;
    if (allPersons !== undefined) {
      allPersons.forEach((person) => {
        person.firstName = person.first_name;
        person.lastName = person.last_name;
        person.isAdmin = person.is_admin;
        delete person.first_name;
        delete person.last_name;
        delete person.is_admin;
      });
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

module.exports.getPersonByPseudo = async (req, res) => {
  const client = await pool.connect();
  const pseudo = req.params.pseudo;

  try {
    const { rows: persons } = await PersonModele.getPersonByPseudo(
      client,
      pseudo
    );
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
  const { pseudo, lastName, firstName, email, password } = req.body;
  const client = await pool.connect();
  try {
    const pseudoExist = await PersonModele.pseudoExist(client, pseudo);
    const emailExist = await PersonModele.emailExist(client, email);
    if (!pseudoExist && !emailExist) {
      const passwordHashed = await getHash(password);
      await PersonModele.postPerson(
        client,
        pseudo,
        lastName,
        firstName,
        email,
        passwordHashed
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
  const { id, pseudo, lastName, firstName, email, password } = req.body;
  const client = await pool.connect();
  try {
    if (!isNaN(id)) {
      await PersonModele.updatePerson(
        client,
        id,
        pseudo,
        lastName,
        firstName,
        email,
        password
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
    await PersonModele.deletePerson(client, id);
    res.sendStatus(204);
  } catch (error) {
    console.error("deletePersonError", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

module.exports.login = async (req, res) => {
  const { pseudo, password } = req.body;
  if (pseudo === undefined || password === undefined) {
    res.sendStatus(400);
  } else {
    const client = await pool.connect();
    try {
      const { userType, value } = await PersonModele.getUserType(
        client,
        pseudo,
        password
      );
      if (userType === "unknow") {
        res.sendStatus(404);
      } else {
        const { id, pseudo } = value;
        const payload = {
          status: userType,
          value: { id, pseudo },
        };
        const token = jwt.sign(payload, process.env.SECRET_TOKEN, {
          // 1 day because
          expiresIn: "1d",
        });
        res.status(200).json(token);
      }
    } catch (e) {
      console.error("personControllerLoginError", e);
      res.sendStatus(500);
    } finally {
      client.release();
    }
  }
};

module.exports.getCurrentUser = async (req, res) => {
  const client = await pool.connect();
  try {
    const headerAuth = req.get("authorization");
    if (headerAuth !== undefined && headerAuth.includes("Bearer")) {
      const jwtToken = headerAuth.split(" ")[1];
      const decodedJwtToken = jwt.verify(jwtToken, process.env.SECRET_TOKEN);
      const userId = decodedJwtToken.value.id;
      const { rows: persons } = await PersonModele.getPersonById(
        client,
        userId
      );
      const person = persons[0];
      if (person !== undefined) {
        person.lastName = person.last_name;
        person.firstName = person.first_name;
        delete person.last_name;
        delete person.first_name;

        console.log(200);
        return res.json(person);
      } else {
        console.log(400);
      }
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.error("getCurrentUserError", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};
