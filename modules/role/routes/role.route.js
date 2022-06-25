var express = require("express");
var router = express.Router();

const roleController = require("../controllers/role.controller.js");

router.post("/create", roleController.create);
router.get("/read/:id", roleController.read);
router.patch("/update/:id", roleController.update);
router.delete("/delete/:id", roleController.delete);
router.get("/list", roleController.list);

module.exports = router;
