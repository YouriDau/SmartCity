const ToiletControleur = require("../controleur/toiletDB");

const Router = require("express-promise-router");
const router = new Router();

router.get("/:id", ToiletControleur.getToilet);
router.get("/", ToiletControleur.getToilets);
router.post("/", ToiletControleur.postToilet);
//router.patch("/", ToiletControleur.updateToilet);
router.delete("/", ToiletControleur.deleteToilet);

module.exports = router;
