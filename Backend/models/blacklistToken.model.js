const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: "1d", // Automatically remove the document after 1 day
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const BlacklistToken = mongoose.model("BlacklistToken", blacklistTokenSchema);
module.exports = BlacklistToken;
