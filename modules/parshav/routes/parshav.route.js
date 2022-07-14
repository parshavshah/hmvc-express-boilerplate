var express = require("express");
var router = express.Router();

const parshavController = require("../controllers/parshav.controller.js");

router.post("/create", parshavController.create);
router.get("/read/:id", parshavController.read);
router.patch("/update/:id", parshavController.update);
router.delete("/delete/:id", parshavController.delete);
router.get("/list", parshavController.list);

module.exports = router;
