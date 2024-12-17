const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    minlength: [6, "UserId must be exactly 6 characters length"],
    maxlength: [6, "UserId must be exactly 6 characters length"],
  },
  name: {
    type: String,
    required: true,
    minlength: [3, "name must be atleast 3 characters length"],
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
  confirmPassword: {
    type: String,
    required: true,
    validator: {
      validate: function (value) {
        if (this.password !== value) {
          return false;
        }
      },
      message: "Password didn't match",
    },
  },
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
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

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now();
});

UserSchema.methods.verifyPassword = async function (password) {
  return bcrypt.compare(password);
};
userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
const User = mongoose.model("Users", UserSchema);
module.exports = User;
