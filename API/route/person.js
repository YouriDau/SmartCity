const PersonControleur = require("../controleur/personDB");

const Router = require("express-promise-router");
const router = new Router();

//const cors = require("cor");

//const whitelist = ["http://172.1.0.254:3001"]

router.get("/", PersonControleur.getAllPersons); // Pour le test
router.get("/:id", PersonControleur.getPerson);
router.post("/", PersonControleur.postPerson);
router.patch("/", PersonControleur.updatePerson);
router.delete("/", PersonControleur.deletePerson);

module.exports = router;
