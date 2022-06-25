var express = require("express");
var router = express.Router();

const userController = require("../controllers/user.controller.js");

router.post("/create", userController.create);
router.get("/read/:id", userController.read);
router.patch("/update/:id", userController.update);
router.delete("/delete/:id", userController.delete);
router.get("/list", userController.list);

module.exports = router;
