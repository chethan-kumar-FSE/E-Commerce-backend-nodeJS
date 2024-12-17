const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const HttpException = require("../Error/Exception");

const generateToken = ({ userId, email, phno, name }) => {
  return jwt.sign(
    { user: { userId, email, phno, name } },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "60d",
    }
  );
};

const protect = async (req, res, next) => {
  const authHeader = req.headers["Authorization"];

  const token = authHeader.split(" ")[1];

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

  if (req.user.userId !== userId) {
    return next(new HttpException(401, "Token no longer belong to this user!"));
  }

  next();
};

const registerUser = async ({ userId, name, email, password, phno, age }) => {
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

const loginUser = async ({ email, password }, next) => {
  const user = await User.findOne({ email });
  if (!user) {
    next(new HttpException(404, "Email not found"));
  }

  const isverifiedUser = await User.verifyPassword(password, user.password);
  if (!isverifiedUser) {
    next(new HttpException(401, "Incorrect password"));
  }
  req.user = decoded;

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

const forgotPassword = async ({ email }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpException(404, "Incorrect Email");
  }

  const resetToken = await User.createPasswordResetToken();
  await User.save({ validateBeforeSave: false });

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
    User.passwordResetToken = undefined;
    User.passwordResetExpires = undefined;
    await User.save({ validateBeforeSave: false });

    throw new HttpException(500, "there was an error sending mail");
  }
};

module.exports = { registerUser, loginUser, protect, forgotPassword };
