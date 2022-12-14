const pool = require("../modele/database");
const PersonModele = require("../modele/personDB");
const ReviewModele = require("../modele/reviewDB");
const ReportModele = require("../modele/reportDB");
const jwt = require("jsonwebtoken");
const {
  getHash,
  compareHash,
  emailValidate,
  pseudoValidate,
} = require("../utils/utils");

module.exports.getCurrentUser = async (req, res) => {
  const client = await pool.connect();
  try {
    const userId = req.session.id;
    const { rows: persons } = await PersonModele.getPersonById(client, userId);
    const person = persons[0];
    if (person !== undefined) {
      person.lastName = person.last_name;
      person.firstName = person.first_name;
      delete person.last_name;
      delete person.first_name;
      res.json(person);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("getCurrentUserError", error);
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

module.exports.getPersonById = async (req, res) => {
  const client = await pool.connect();
  const idText = req.params.id; //attention ! Il s'agit de texte !
  const id = parseInt(idText);

  try {
    const { rows: persons } = await PersonModele.getPersonById(client, id);
    const person = persons[0];
    if (person !== undefined) {
      res.json(person);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("getPersonByIdError", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

module.exports.getAllPersons = async (req, res) => {
  const client = await pool.connect();
  try {
    const { rows: allPersons } = await PersonModele.getAllPersons(client);
    if (allPersons !== undefined) {
      const persons = allPersons.map((person) => {
        return {
          id: person.id,
          pseudo: person.pseudo,
          lastName: person.last_name,
          firstName: person.first_name,
          email: person.email,
        };
      });
      res.json(persons);
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
          // 1 day because when a user visit our app, it's usually for 1 (for example to visit a city)
          // So they can use our app during 1 day without reconnect themself (userfriendly)
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

module.exports.postPerson = async (req, res) => {
  const { pseudo, lastName, firstName, email, password } = req.body;
  if (
    pseudo === undefined ||
    lastName === undefined ||
    firstName === undefined ||
    email === undefined ||
    password === undefined
  ) {
    res.sendStatus(400);
  } else {
    const client = await pool.connect();
    try {
      if (pseudoValidate(pseudo) && emailValidate(email)) {
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
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error("postPersonError", error);
      res.sendStatus(500);
    } finally {
      client.release();
    }
  }
};

module.exports.updatePerson = async (req, res) => {
  // Comment gérer le cas du changement du mdp?
  // TODO: supprimer les questions dans les commentaires que le prof pourrait utiliser à l'examen ;)
  const { pseudo, lastName, firstName, email } = req.body;
  if (
    pseudo === undefined ||
    lastName === undefined ||
    firstName === undefined ||
    email === undefined ||
    password === undefined
  ) {
    res.sendStatus(400);
  } else {
    const client = await pool.connect();
    try {
      await PersonModele.updatePerson(
        client,
        req.session.id,
        pseudo,
        lastName,
        firstName,
        email
      );
      // New JWT because the informations was been modified
      const payload = {
        status: req.session.authLevel,
        value: { id: req.session.id, pseudo: pseudo },
      };
      const token = jwt.sign(payload, process.env.SECRET_TOKEN, {
        expiresIn: "1d",
      });

      res.status(200).send(token);
    } catch (error) {
      console.error("updatePersonError", error);
      res.sendStatus(500);
    } finally {
      client.release();
    }
  }
};

module.exports.deletePersonById = async (req, res) => {
  const { id } = req.body;
  if (id === undefined) {
    res.sendStatus(400);
  } else {
    const client = await pool.connect();
    try {
      await deleteUserId(client, id);
      res.sendStatus(204);
    } catch (error) {
      console.error("deletePersonByIdError", error);
      res.sendStatus(500);
    } finally {
      client.release();
    }
  }
};

module.exports.deletePerson = async (req, res) => {
  const { password } = req.body;
  if (password === undefined) {
    res.sendStatus(400);
  } else {
    const client = await pool.connect();
    try {
      const { rows } = await PersonModele.getPersonByPseudo(
        client,
        req.session.pseudo
      );
      const person = rows[0];
      if (await compareHash(password, person.password)) {
        await deleteUserId(client, req.session.id);
        res.sendStatus(204);
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error("deletePersonError", error);
      res.sendStatus(500);
    } finally {
      client.release();
    }
  }
};

async function deleteUserId(client, id) {
  client.query("START TRANSACTION");
  const { rows: reviews } = await ReviewModele.getReviewsByUser(client, id);
  if (reviews !== undefined) {
    for (let iReview = 0; iReview < reviews.length; iReview++) {
      await ReviewModele.deleteReview(client, reviews[iReview].id);
    }
  }

  const { rows: reports } = await ReportModele.getReportsByUser(client, id);
  if (reports !== undefined) {
    for (let iReport = 0; iReport < reports.length; iReport++) {
      await ReportModele.deleteReport(client, reports[iReport].id);
    }
  }

  await PersonModele.deletePerson(client, id);
  client.query("COMMIT TRANSACTION");
}
