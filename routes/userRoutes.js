const express = require('express');
const router = express.Router();
const userLogin = require("../controllers/userController")
const userController = require("../controllers/userController");

router.post("/login",userController.loginUser);

router.route("/").post(userController.registerUser)



module.exports = router;