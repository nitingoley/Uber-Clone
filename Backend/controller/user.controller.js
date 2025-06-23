const userModel = require("../models/user.model.js");
const userService = require("../services/user.service.js");
const { validationResult } = require("express-validator");
const BlacklistToken = require("../models/blacklistToken.model.js")
// Controller function to handle user registration
module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  // Hash the user's password using the static method
  const hashedPassword = await userModel.hashPassword(password);

  // Create a new user using the user service
  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  // Generate JWT token using instance method
  const token = user.generateAuthToken();

  res.status(201).json({
    token,
    user,
  });
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  // Find user by email
  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Use instance method to compare passwords
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate JWT token using instance method
  const token = user.generateAuthToken();

  res.cookie('token', token);

  res.status(200).json({
    token,
    user,
  });
};


module.exports.getUserProfile = async(req , res , next)=>{
  res.status(200).json({user});
}



module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await BlacklistToken.create({ token });
  res.status(200).json({ message: "User logged out successfully" });
};
