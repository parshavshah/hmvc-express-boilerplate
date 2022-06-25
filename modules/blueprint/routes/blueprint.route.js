var express = require("express");
var router = express.Router();

const blueprintController = require("../controllers/blueprint.controller.js");

router.post("/create", blueprintController.create);
router.get("/read/:id", blueprintController.read);
router.patch("/update/:id", blueprintController.update);
router.delete("/delete/:id", blueprintController.delete);
router.get("/list", blueprintController.list);

module.exports = router;
