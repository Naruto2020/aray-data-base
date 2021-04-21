// initialisation du routeur express
const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");


// display all users 
router.get("/data", userController.getData);

// singUp
router.post("/create", userController.singUp);

// singIn 
router.post("/login", userController.singIn);

module.exports = router;