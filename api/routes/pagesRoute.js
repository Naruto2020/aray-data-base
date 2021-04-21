const express = require("express");
const router = express.Router();
const pagesController = require("../controller/pagesController");


// display sing up page 
router.get("/create", pagesController.display);

router.get("/connect", pagesController.connexion);

// display home page 
router.get("/restricted", pagesController.homePage);




module.exports = router;