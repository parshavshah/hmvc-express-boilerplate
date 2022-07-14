var express = require("express");
var router = express.Router();

const employeeController = require("../controllers/employee.controller.js");

router.post("/create", employeeController.create);
router.get("/read/:id", employeeController.read);
router.patch("/update/:id", employeeController.update);
router.delete("/delete/:id", employeeController.delete);
router.get("/list", employeeController.list);

module.exports = router;
