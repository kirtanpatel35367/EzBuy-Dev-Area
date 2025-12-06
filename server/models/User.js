const { optional } = require("joi");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  profilePicture: {
    type: String,
    default: "",
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
    unique: true,
  },
  username: {
    type: String,
    required: [true, "UserName is Required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
  originalPassword: {
    type: String,
  },
  otp: {
    type: String,
  },
  otpExpiry: {
    type: Date,
  },
  role: {
    type: String,
    default: "user",
  },
  membershipStatus: {
    type: String,
    default: "free",
  },
  membershipType: {
    type: String,
    default: "free",
  },
  membershipStartDate: {
    type: Date,
  },
  membershipEndDate: {
    type: Date,
  },
  is2FAEnabled: {
    type: Boolean,
    default: false,
  },
  emailNotifications2FA: {
    type: Boolean,
    default: false,
  },
  smsNotifications2FA: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
