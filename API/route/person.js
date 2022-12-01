const PersonControleur = require("../controleur/personDB");

const Router = require("express-promise-router");
const router = new Router();

router.get("/current", PersonControleur.getCurrentUser);
router.get("/:pseudo", PersonControleur.getPersonByPseudo);
router.get("/", PersonControleur.getAllPersons); // Pour le test
router.post("/login", PersonControleur.login);
router.post("/", PersonControleur.postPerson);
router.patch("/", PersonControleur.updatePerson);
router.delete("/", PersonControleur.deletePerson);

module.exports = router;
