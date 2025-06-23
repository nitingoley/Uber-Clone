const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [3, "First name must be at least 3 characters long"],
      maxlength: [50, "First name cannot exceed 50 characters"]
    },
    lastname: {
      type: String,
      trim: true,
      minlength: [3, "Last name must be at least 3 characters long"],
      maxlength: [50, "Last name cannot exceed 50 characters"]
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
    minlength: [6, "Password must be at least 6 characters long"]
  },
  socketId: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ["active", "inactive", "banned"],
    default: "inactive"
  },
  vehicle: {  // Fixed typo from 'vechicle' to 'vehicle'
    color: {
      type: String,
      required: [true, "Vehicle color is required"]
    },
    plate: {
      type: String,
      required: [true, "License plate is required"],
      unique: true,
      uppercase: true,
      trim: true
    },
    capacity: {
      type: Number,
      required: [true, "Vehicle capacity is required"],
      min: [1, "Capacity must be at least 1"],
      max: [10, "Capacity cannot exceed 10"]
    },
    vehicleType: {
      type: String,
      enum: ["car", "bike", "auto"],  // Changed "Auto" to lowercase for consistency
      required: [true, "Vehicle type is required"]
    }
  },
  location: {
    type: {
      type: String,
      default: "Point",
      enum: ["Point"]
    },
    coordinates: {
      type: [Number],
      index: "2dsphere"
    }
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt fields automatically
});

// Add 2dsphere index for geospatial queries
captainSchema.index({ location: "2dsphere" });

// JWT token generation method
captainSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { _id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// Password comparison method
captainSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Static method for password hashing
captainSchema.statics.hashPassword = async function(password) {
  return await bcrypt.hash(password, 10);
};

const Captain = mongoose.model("Captain", captainSchema);
module.exports = Captain;