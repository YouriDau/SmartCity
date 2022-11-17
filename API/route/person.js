const PersonControleur = require("../controleur/personDB");

const Router = require("express-promise-router");
const router = new Router();

router.get("/", PersonControleur.getAllPersons); // Pour le test
router.get("/:pseudo", PersonControleur.getPerson);
router.post("/", PersonControleur.postPerson);
router.patch("/", PersonControleur.updatePerson);
router.delete("/", PersonControleur.deletePerson);

module.exports = router;
