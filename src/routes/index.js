const router = require("express").Router();
const controller = require("../controllers");
router.get("/api/listmanga", controller.fetchManga);

module.exports = router;
