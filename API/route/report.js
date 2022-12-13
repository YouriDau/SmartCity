const ReportControleur = require("../controleur/reportDB");
const JWTMiddleware = require("../middleware/Identification");

const Router = require("express-promise-router");
const router = new Router();

router.get("/notDone", ReportControleur.getNotDoneReports);
router.get("/all", ReportControleur.getAllReports);
router.get("/:id", ReportControleur.getReport);
router.post("/", JWTMiddleware.identification, ReportControleur.postReport);
router.put("/", ReportControleur.updateReport);
router.delete("/", ReportControleur.deleteReport);

module.exports = router;
