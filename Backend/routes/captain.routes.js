const express  = require('express');
const router   = express.Router();
const { body } = require("express-validator");
const captainController = require("../controller/captain.controller.js");
const  authMiddleware = require('../middleware/auth.middleware.js');




router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First Name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be 6 character long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Vehicle color must be at least 3 characters long"),
    body("vehicle.model")
      .isLength({ min: 3 })
      .withMessage("Vehicle model must be at least 3 characters long"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Vehicle capacity must be at least 1"),
    body("vehicle.vehicleType")
      .isInt(["Car", "Bike", "Auto"])
      .withMessage("Vehicle type must be either Car, Bike, or Truck"),
  ],

  captainController.registerCaptain
);






router.post("/login", 
[
  body("email").isEmail().withMessage("Invalid Email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
],
captainController.loginCaptain
);

router.get("/profile", authMiddleware.AuthCaptain,captainController.getCaptainProfile);
router.get("/logout" , authMiddleware.AuthCaptain , captainController.logoutCaptain);

module.exports = router;