const ReviewControleur = require("../controleur/reviewDB");
const JWTMiddleware = require("../middleware/Identification");
const AuthoMiddleware = require("../middleware/Authorization");

const Router = require("express-promise-router");
const router = new Router();

router.get("/:toiletId", ReviewControleur.getReviewsByToiletId);
router.post("/", JWTMiddleware.identification, ReviewControleur.postReview);
router.put(
  "/",
  JWTMiddleware.identification,
  AuthoMiddleware.mustBeAdminOrOwnerReview,
  ReviewControleur.updateReview
);
router.delete(
  "/",
  JWTMiddleware.identification,
  AuthoMiddleware.mustBeAdminOrOwnerReview,
  ReviewControleur.deleteReview
);

module.exports = router;
