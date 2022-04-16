const mongoose = require("mongoose");
const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = mongoose.Schema({}, { strict: false });

userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log(this.password);
  return await bcyrpt.compare(enteredPassword, this.password);
};

// Should hash the password on registration.
userSchema.pre("save", async function (next) {
  //conditional will check to see if the password is being modified so it wont update the password constantly.
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcyrpt.genSalt(10);
  this.password = await bcyrpt.hash(this.password, salt);
});
// enforces that the email string be lower case throughout, as if it isnt, a user with
// test@email.com and a user Test@email.com do not match, and you can end up with duplicate emails..
userSchema.pre("save", async function (next) {
  this.email = this.email.toLowerCase();
  next();
});

// Generate and hash password token
userSchema.methods.getResetPasswordToken = async function () {
  // Generate a token
  // this returns a buffer, we want to make it into a string
  const resetToken = crypto.randomBytes(20).toString("hex");
  // Hash token and set to resetPasswordToken field.
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expiration, 10 minutes
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
// Sign JWT and return
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
