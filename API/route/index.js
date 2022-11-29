const PersonRouter = require("./person");
const ReportRouter = require("./report");
const ReviewRouter = require("./review");
const ToiletRouter = require("./toilet");

const router = require("express").Router();

router.use("/review", ReviewRouter);
router.use("/person", PersonRouter);
router.use("/report", ReportRouter);
router.use("/toilet", ToiletRouter);

module.exports = router;
