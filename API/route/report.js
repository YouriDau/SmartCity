const ReportControleur = require("../controleur/reportDB");

const Router = require("express-promise-router");
const router = new Router();

router.get("/:toiletId", ReportControleur.getReport);
router.post("/", ReportControleur.postReport);
//router.patch("/", ReportControleur.updateReport);
router.delete("/", ReportControleur.deleteReport);

module.exports = router;
