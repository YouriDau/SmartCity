//const PersonControleur = require("../controleur/person");
//const router = require("express").Router();
const PersonControleur = require("../controleur/personDB");

const Router = require("express-promise-router");
const router = new Router;

router.get('/:pseudo', PersonControleur.getPerson);
//router.post('/', PersonControleur.postPerson);
//router.patch('/', PersonControleur.updatePerson);
//router.delete('/', PersonControleur.deletePerson);

module.exports = router; 