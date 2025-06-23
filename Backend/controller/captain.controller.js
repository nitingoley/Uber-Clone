const captainService = require("../services/captain.service.js");
const captainModel = require("../models/captain.model.js");
const { validationResult } = require("express-validator");
const BlacklistToken = require('../models/blacklistToken.model.js');

// captain register controllers

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;


   const isCaptainExists = await captainModel.findOne({ email });
   
   
   if (isCaptainExists) {
        return res.status(400).json({ error: "Captain already exists" });
    }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = await captain.generateAuthToken();

  res.status(201).json({ token, captain });
};

// captain login controllers
module.exports.loginCaptain = async (req, res, next) => {
 const errors = validationResult(req);

 if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  const {email , password} = req.body;


  const captain = await captainModel.findOne({email}).select("+password");


  if (!captain) {
    return res.status(400).json({ error: "Invalid email or password" });
  };


  const isPasswordMatch = await captain.comparePassword(password);

  if( !isPasswordMatch) {   
    return res.status(400).json({ error: "Invalid email or password" });
  }


  const token = captain.generateAuthToken();


  res.cookie("token", token);

    res.status(200).json({ token, captain });

}



// get captain profile controllers
module.exports.getCaptainProfile = async (req , res , next) => {
    res.status(200).json({ captain: req.captain});
}


// logout captain controllers
module.exports.logoutCaptain = async (req , res  , next) => {
    

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized access, token is missing" });
    }

    await  blackListTokenModel.create({ token });

    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
}
