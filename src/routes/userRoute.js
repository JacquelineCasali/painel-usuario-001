const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

// localhost:3000/
router.get("/", userController.index);

module.exports = router;