const ReportControleur = require("../controleur/reportDB");
const JWTMiddleware = require("../middleware/Identification");

const Router = require("express-promise-router");
const router = new Router();

router.get("/:toiletId", ReportControleur.getReport);
router.get("/", ReportControleur.getAllReports);
router.post("/", JWTMiddleware.identification, ReportControleur.postReport);
//router.patch("/", ReportControleur.updateReport);
router.delete("/", ReportControleur.deleteReport);

module.exports = router;
