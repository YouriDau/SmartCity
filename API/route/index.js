const PersonRouter = require("./person");
// const ReportRouter = require("./report");
// const ReviewRouter = require("./review");
// const ToiletRouter = require("./toilet");
const router = require("express").Router();

router.use("/person", PersonRouter);

module.exports = router;
