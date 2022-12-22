const PersonControleur = require("../controleur/personDB");
const JWTMiddleware = require("../middleware/Identification");
const AuthoMiddleware = require("../middleware/Authorization");

const Router = require("express-promise-router");
const router = new Router();

router.get(
  "/current",
  JWTMiddleware.identification,
  PersonControleur.getCurrentUser
);

/**
 * @swagger
 * /person/{id}:
 *  get:
 *    tags:
 *      - Person
 *    parameters:
 *      - name: id
 *        description: ID d'une personne
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        $ref: '#/components/responses/PersonFound'
 *      400:
 *        description: l'id de la personne n'est pas un nombre
 *      404:
 *        description: Personne non trouvée
 *      500:
 *        description: Erreur serveur
 *
 */
router.get("/:id", PersonControleur.getPersonById);
router.get("/", PersonControleur.getAllPersons); // Pour le test
router.post("/login", PersonControleur.login);

/**
 * @swagger
 * /person:
 *  post:
 *    tags:
 *      - Person
 *    requestBody:
 *      $ref: '#/components/requestBodies/PersonneAAjoute'
 *    responses:
 *      201:
 *        $ref: '#/components/responses/PersonneAjoute'
 *      400:
 *        description: l'email et/ou le password est incorrect
 *      409:
 *        description: l'email et/ou le pseudo existe deja
 *      500:
 *        description: Erreur serveur
 */
router.post("/", PersonControleur.postPerson);
router.put(
  "/currentUserPassword",
  JWTMiddleware.identification,
  PersonControleur.updatePassword
);

router.put(
  "/userPassword",
  JWTMiddleware.identification,
  PersonControleur.updateUserPassword
)

router.put(
  "/byId",
  JWTMiddleware.identification,
  PersonControleur.updatePersonById
);

/**
 * @swagger
 * /person:
 *  put:
 *    tags:
 *      - Person
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      $ref: '#/components/requestBodies/PersonneAUpdate'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/PersonneUpdated'
 *      400:
 *        $ref: '#/components/responses/ErrorJWT'
 *      401:
 *        $ref: '#/components/responses/MissingJWT'
 *      500:
 *        description: Erreur serveur
 */
router.put("/", JWTMiddleware.identification, PersonControleur.updatePerson);

router.delete(
  "/deleteUser",
  JWTMiddleware.identification,
  AuthoMiddleware.mustBeAdmin,
  PersonControleur.deletePersonById
);

router.delete("/", JWTMiddleware.identification, PersonControleur.deletePerson);

module.exports = router;
