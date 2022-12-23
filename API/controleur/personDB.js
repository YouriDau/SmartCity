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
      const newPerson = {
        id: person.id,
        pseudo: person.pseudo,
        lastName: person.lastName,
        firstName: person.firstName,
        email: person.email,
        role: req.session.authLevel,
      };
      res.json(newPerson);
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

/**
 * @swagger
 * components:
 *  schemas:
 *    Person:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        pseudo:
 *          type: string
 *        lastName:
 *          type: string
 *        firstName:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *          format: password
 */
/**
 * @swagger
 * components:
 *  responses:
 *    PersonFound:
 *      description: renvoie une personne
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Person'
 */
module.exports.getPersonById = async (req, res) => {
  const client = await pool.connect();
  const idText = req.params.id; //attention ! Il s'agit de texte !
  const id = parseInt(idText);

  if (isNaN(id)) {
    res.status(400).json("person id is not a number!");
  } else {
    try {
      const { rows: persons } = await PersonModele.getPersonById(client, id);
      const person = persons[0];
      if (person !== undefined) {
        const newPerson = {
          id: person.id,
          pseudo: person.pseudo,
          lastName: person.last_name,
          firstName: person.first_name,
          email: person.email,
          isAdmin: person.is_admin,
        };
        res.json(newPerson);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error("getPersonByIdError", error);
      res.sendStatus(500);
    } finally {
      client.release();
    }
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
    res.status(400).json("pseudo of password is undefined!");
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

/**
 * @swagger
 * components:
 *  responses:
 *    PersonneAjoute:
 *      description: la personne a été ajoutée
 *  requestBodies:
 *    PersonneAAjoute:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              pseudo:
 *                type: string
 *              lastName:
 *                type: string
 *              firstName:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *                format: password
 */
module.exports.postPerson = async (req, res) => {
  const { pseudo, lastName, firstName, email, password } = req.body;
  if (
    pseudo === undefined ||
    lastName === undefined ||
    firstName === undefined ||
    email === undefined ||
    password === undefined
  ) {
    res
      .status(400)
      .json("pseudo or lastName or firstName or email is undefined!");
  } else {
    const client = await pool.connect();
    try {
      if (pseudoValidate(pseudo)) {
        if (emailValidate(email)) {
          const pseudoExist = await PersonModele.pseudoExist(client, pseudo);

          if (!pseudoExist) {
            const emailExist = await PersonModele.emailExist(client, email);
            if (!emailExist) {
              const passwordHashed = await getHash(password);
              const { rows } = await PersonModele.postPerson(
                client,
                pseudo,
                lastName,
                firstName,
                email,
                passwordHashed
              );
              res.status(201).json(rows[0]);
            } else {
              res.status(409).json("email already exist!");
            }
          } else {
            // 409 = conflict
            res.status(409).json("pseudo already exist!");
          }
        } else {
          res.status(400).json("email incorrect!");
        }
      } else {
        res.status(400).json("pseudo incorrect!");
      }
    } catch (error) {
      console.error("postPersonError", error);
      res.sendStatus(500);
    } finally {
      client.release();
    }
  }
};

/**
 * @swagger
 * components:
 *  responses:
 *    PersonneUpdated:
 *      description: la personne a été mise à jour
 *  requestBodies:
 *    PersonneAUpdate:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              pseudo:
 *                type: string
 *              lastName:
 *                type: string
 *              firstName:
 *                type: string
 *              email:
 *                type: string
 */
module.exports.updatePerson = async (req, res) => {
  // Comment gérer le cas du changement du mdp?
  // TODO: supprimer les questions dans les commentaires que le prof pourrait utiliser à l'examen ;)
  const { pseudo, lastName, firstName, email } = req.body;
  if (
    pseudo === undefined ||
    lastName === undefined ||
    firstName === undefined ||
    email === undefined
  ) {
    res
      .status(400)
      .json("pseudo or lastName or firstName or email is undefined!");
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
      // New JWT because the informations has been modified
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

module.exports.updatePersonById = async (req, res) => {
  const { id, pseudo, lastName, firstName, email } = req.body;

  if (
    id === undefined ||
    pseudo === undefined ||
    lastName === undefined ||
    firstName === undefined ||
    email === undefined
  ) {
    res
      .status(400)
      .json("id or pseudo or lastName or firstName or email is undefined!");
  } else {
    const client = await pool.connect();
    try {
      await PersonModele.updatePerson(
        client,
        id,
        pseudo,
        lastName,
        firstName,
        email
      );
      res.sendStatus(204);
    } catch (error) {
      console.error("updatePersonByIdError", error);
      res.sendStatus(500);
    } finally {
      client.release();
    }
  }
};

module.exports.updateCurrentUserPassword = async (req, res) => {
  const { password, newPassword } = req.body;
  if (password !== undefined && newPassword !== undefined) {
    const client = await pool.connect();
    try {
      const { rows } = await PersonModele.getPersonByPseudo(
        client,
        req.session.pseudo
      );
      const currentUser = rows[0];

      const currentPassword = currentUser.password;
      if (await compareHash(password, currentPassword)) {
        const newPasswordHashed = await getHash(newPassword);
        await PersonModele.updatePassword(
          client,
          req.session.id,
          newPasswordHashed
        );
        res.sendStatus(204);
      } else {
        res.status(400).json("you didn't entered the correct user password");
      }
    } catch (error) {
      console.error("updatePasswordError", error);
      res.sendStatus(500);
    } finally {
      client.release();
    }
  } else {
    res.status(400).json("one of the passwords is undefined!");
  }
};

module.exports.updateUserPassword = async (req, res) => {
  const { id, newPassword } = req.body;
  if (newPassword != undefined) {
    const client = await pool.connect();
    try {
      const newPasswordHashed = await getHash(newPassword);
      await PersonModele.updatePassword(client, id, newPasswordHashed);
      res.sendStatus(204);
    } catch (error) {
      console.error("updatePasswordError", error);
      res.sendStatus(500);
    } finally {
      client.release();
    }
  } else {
    res.status(400).json("one of the passwords is undefined!");
  }
};

module.exports.deletePersonById = async (req, res) => {
  const { id } = req.body;
  if (id === undefined) {
    res.status(400).json("id is undefined!");
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

/**
 * @swagger
 * components:
 *  responses:
 *    PersonneDeleted:
 *      description: la personne a été supprimé
 */
module.exports.deletePerson = async (req, res) => {
  const { password } = req.body;
  if (password === undefined) {
    res.status(400).json("password is undefined!");
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
        res.status(400).json("password incorrect!");
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
