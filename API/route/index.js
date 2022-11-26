const PersonRouter = require("./person");
// const ReportRouter = require("./report");
const ReviewRouter = require("./review");
const ToiletRouter = require("./toilet");
const UserRouter = require("./user");

const cors = require("cors");
const router = require("express").Router();

router.use("/person", cors(), PersonRouter);
router.use("/review", cors(), ReviewRouter);
router.use("/toilet", cors(), ToiletRouter);
router.use("/user", cors(), UserRouter);

module.exports = router;
