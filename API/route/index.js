const PersonRouter = require("./person");
//const ReportRouter = require("./report");
const ReviewRouter = require("./review");
const ToiletRouter = require("./toilet");
const UserRouter = require("./user");

const router = require("express").Router();

router.use("/review", ReviewRouter);
router.use("/person", PersonRouter);
//router.user("/report", ReportRouter);
router.use("/toilet", ToiletRouter);
router.use("/user", UserRouter);

module.exports = router;
