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
router.get("/:pseudo", PersonControleur.getPersonByPseudo);
router.get("/", PersonControleur.getAllPersons); // Pour le test
router.post("/login", PersonControleur.login);
router.post("/", JWTMiddleware.identification, PersonControleur.postPerson);
router.put("/", JWTMiddleware.identification, PersonControleur.updatePerson);
router.delete(
  "/deleteUser",
  JWTMiddleware.identification,
  AuthoMiddleware.mustBeAdmin,
  PersonControleur.deletePersonById
);
router.delete("/", JWTMiddleware.identification, PersonControleur.deletePerson);

module.exports = router;
