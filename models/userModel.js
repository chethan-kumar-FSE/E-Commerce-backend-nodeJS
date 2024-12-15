const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    minlength: [6, "UserId must be exactly 6 characters length"],
    maxlength: [6, "UserId must be exactly 6 characters length"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    match: [
      /^(?=.*\d)(?=.*[A-Z]).{6,}$/,
      "Password must be at least 6 characters long, contain one uppercase letter and one digit.",
    ],
  },
  name: {
    type: String,
    required: true,
    minlength: [3, "name must be atleast 3 characters length"],
  },
  phno: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Phon must be exactly 10 digits longer"],
    unique: true,
  },
  age: {
    type: Number,
    required: true,
    validator: {
      validate: (value) => {
        return value >= 18;
      },
      message: "user must be atleast 18 years old",
    },
  },
});

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ phno: 1 }, { unique: true });
UserSchema.index({ userId: 1 }, { unique: true });

const User = mongoose.model("Users", UserSchema);
module.exports = User;
