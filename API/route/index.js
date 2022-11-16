const PersonRouter = require("./person");
const router = require("express").Router();

router.use("/person", PersonRouter);

module.exports = router;
