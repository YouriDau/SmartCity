const userController = require("../controleur/userDB");

const Router = require("express-promise-router");
const router = new Router();

router.post("/login", userController.login);

module.exports = router;
