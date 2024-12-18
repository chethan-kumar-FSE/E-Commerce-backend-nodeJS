const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const HttpException = require("../Error/Exception");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/email");
const crypto = require("crypto");

const generateToken = ({ userId, email, phno, name }) => {
  return jwt.sign(
    { user: { userId, email, phno, name } },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "60d",
    }
  );
};

const protectService = async (req, res, next) => {
  const authHeader = req.headers["Authorization"];

  let token;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return next(
      new HttpException(401, "Not allowed to access to this resource !")
    );
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  if (!decoded) {
    return next(new HttpException(403, "Invalid token"));
  }

  const userId = decoded.userId;
  if (!userId) {
    throw new HttpException(401, "Token doesnt belong to the current user");
  }

  if (await currentUser.passwordChangedAfter(decoded.iat)) {
    return next(
      new AppError("you're password has been updated , please re-login", 401)
    );
  }
  next();
};

const registerUserService = async ({
  userId,
  name,
  email,
  password,
  phno,
  age,
}) => {
  const hashedPassword = await bcrypt.hash(password, 10);
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

const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  console.log("user", user);
  if (!user) {
    throw new HttpException(404, "Email not found");
  }

  const isverifiedUser = await user.verifyPassword(password, user.password);
  if (!isverifiedUser) {
    throw new HttpException(401, "Incorrect password");
  }

  const { userId, email: userEmail, phno, name } = user;
  const token = generateToken({ userId, email: userEmail, phno, name });
  return {
    message: "User loggedIn successfully",
    data: {
      userId,
      name,
      email,
      phno,
      token,
    },
  };
};

const forgotPasswordService = async ({ email, req }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpException(404, "Incorrect Email");
  }

  const resetToken = await user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/user/resetpassword/${resetToken}`;
  const message = `forgot your password? sbmit a patch request with your new password to ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "your password reset toekn",
      message: message,
    });
    return {
      status: "success",
      message: "token was sent to mail",
    };
  } catch (err) {
    console.log("err", err);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    throw new HttpException(500, "there was an error sending mail");
  }
};

const resetPasswordService = async ({
  password,
  confirmPassword,
  token: tokenQuery,
}) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(tokenQuery)
    .digest("hex");

  // Use `findOne` to get a single user document
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new HttpException(401, "Reset time has expired or token is invalid");
  }

  if (password !== confirmPassword) {
    throw new HttpException(401, "Password doesnt match");
  }
  // Update the user fields
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;

  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;
  //user.confirmPassword = confirmPassword;

  console.log("user", user);

  // Save the updated user document
  await user.save();

  // Destructure the required fields
  const { userId, email, phno, name } = user;

  // Generate a new token
  const token = generateToken({ userId, email, phno, name });

  return {
    message: "Password changed successfully",
    token,
  };
};

module.exports = {
  registerUserService,
  loginUserService,
  protectService,
  forgotPasswordService,
  resetPasswordService,
};
