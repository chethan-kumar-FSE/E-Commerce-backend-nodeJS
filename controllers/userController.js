const handleErrors = require("../Error/ErrorHandler");
const {
  registerUserService,
  loginUserService,
  forgotPasswordService,
  resetPasswordService,
} = require("../services/userService");

exports.registerUser = async (req, res, next) => {
  try {
    const { userId, name, email, password, phno, age } = req.body;
    const result = await registerUserService({
      userId,
      name,
      email,
      password,
      phno,
      age,
    });

    res.status(200).json(result);
  } catch (err) {
    console.log("err", err);
    handleErrors(err, next);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await loginUserService({ email, password }, next);
    res
      .status(200)
      .header("Authorization", `Bearer ${result.data.token}`)
      .json(result);
  } catch (err) {
    console.log("err", err);
    handleErrors(err, next);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await forgotPasswordService({ email, req });
    res.status(200).json(result);
  } catch (err) {
    console.log("err", err);
    handleErrors(err, next);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { password, confirmPassword } = req.body;
    const { token } = req.params;
    const result = await resetPasswordService({
      password,
      confirmPassword,
      token,
    });
    res
      .status(200)
      .header("Authorization", `Bearer ${result.token}`)
      .json({ message: result.message });
  } catch (err) {
    console.log("err", err);
    handleErrors(err, next);
  }
};
//exports.loginUser = async (req, res, next) => {};
