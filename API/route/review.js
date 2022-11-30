const ReviewControleur = require("../controleur/reviewDB");
const JWTMiddleware = require("../middleware/Identification");
const AuthoMiddleware = require("../middleware/Authorization");

const Router = require("express-promise-router");
const router = new Router();

router.get("/:toiletId", ReviewControleur.getReviews);
router.post("/", ReviewControleur.postReview);
router.patch("/", ReviewControleur.updateReview);
router.delete(
  "/",
  JWTMiddleware.identification,
  AuthoMiddleware.mustBeAdminOrOwnerReview,
  ReviewControleur.deleteReview
);

module.exports = router;
