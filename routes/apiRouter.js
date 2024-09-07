const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

router.get("/getall", apiController.getAll);
router.get("/:id", apiController.getId);
router.post("/add", apiController.postAdd);
router.patch("/update/:id", apiController.patchId);
router.delete("/delete/:id", apiController.deleteId);

module.exports = router;
