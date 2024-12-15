const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const HttpException = require("../Error/Exception");
const { generateToken } = require("../utils/token");

const registerUser = async ({ userId, name, email, password, phno, age }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hasedpasword", hashedPassword);
  const user = new User({
    userId,
    email,
    name,
    password: hashedPassword,
    phno,
    age,
  });
  const isUserSaved = await user.save();

  if (!isUserSaved) {
    throw new HttpException(500, "User not saved");
  }
  return {
    message: "User registered successfully",
    user: isUserSaved,
  };
};

const loginUser = async ({ email, password }, next) => {
  const user = await User.findOne({ email });
  if (!user) {
    next(new HttpException(404, "Email not found"));
  }

  const unhashedPassword = await bcrypt.compare(password, user.password);
  if (!unhashedPassword) {
    next(new HttpException(401, "Incorrect password"));
  }

  const { userId, email: userEmail, phno, name } = user;
  return {
    message: "User loggedIn successfully",
    data: {
      userId,
      name,
      email,
      phno,
      token: generateToken({ userId, email: userEmail, phno, name }),
    },
  };
};

module.exports = { registerUser, loginUser };
