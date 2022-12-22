const ToiletControleur = require("../controleur/toiletDB");
const JWTMiddleware = require("../middleware/Identification");
const AuthoMiddleware = require("../middleware/Authorization");

const Router = require("express-promise-router");
const router = new Router();

router.get("/:id", ToiletControleur.getToilet);
router.get("/", ToiletControleur.getToiletsAndLocation);
router.post("/", JWTMiddleware.identification, ToiletControleur.postToilet);
router.patch(
  "/",
  JWTMiddleware.identification,
  AuthoMiddleware.mustBeAdmin,
  ToiletControleur.updateToilet
);
router.delete(
  "/",
  JWTMiddleware.identification,
  AuthoMiddleware.mustBeAdmin,
  ToiletControleur.deleteToilet
);

module.exports = router;
