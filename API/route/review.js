const ReviewControleur = require("../controleur/reviewDB");

const Router = require("express-promise-router");
const router = new Router();

router.get("/:toiletId", ReviewControleur.getReviews);
// router.post("/", ReviewControleur.postReview);
// router.patch("/", ReviewControleur.updateReview);
// router.delete("/", ReviewControleur.deleteReview);

module.exports = router;
