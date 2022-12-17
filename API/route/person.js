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
 *      name: id
 *      description: ID d'une personne
 *      in: path
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      '400':
 *        description: l'id de la personne n'est pas un nombre
 *      '404':
 *        description: Personne non trouvée
 *      '500':
 *        description: Erreur serveur
 *    
 */
router.get("/:id", PersonControleur.getPersonById);
router.get("/", PersonControleur.getAllPersons); // Pour le test
router.post("/login", PersonControleur.login);
router.post("/", PersonControleur.postPerson);
router.put("/", JWTMiddleware.identification, PersonControleur.updatePerson);
router.delete(
  "/deleteUser",
  JWTMiddleware.identification,
  AuthoMiddleware.mustBeAdmin,
  PersonControleur.deletePersonById
);
router.delete("/", JWTMiddleware.identification, PersonControleur.deletePerson);

module.exports = router;
