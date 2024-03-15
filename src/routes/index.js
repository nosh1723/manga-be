const router = require("express").Router();
const controller = require("../controllers");

router.post("/api/register", controller.register);
router.post("/api/login", controller.login);
router.post("/api/create-manga", controller.createManga);
router.get("/api/all-manga", controller.getAllManga);
router.get("/api/manga/:id", controller.getManga);
router.put("/api/update-manga/:id", controller.updateManga);
router.delete("/api/delete-manga/:id", controller.deleteManga);

module.exports = router;
