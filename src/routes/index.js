const router = require("express").Router();
const controller = require("../controllers");

router.post("/api/register", controller.register);

module.exports = router;
