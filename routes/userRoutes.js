const express = require("express");
const {
  registerUserValidator,
  loginUserValidator,
} = require("../validators/userValidator");
const validateFields = require("../middleware/validateFields");
const {
  registerUser,
  loginUser,
  forgotPassword,
} = require("../services/userService");
const handleErrors = require("../Error/ErrorHandler");

const router = express.Router();

router.post(
  "/register",
  registerUserValidator,
  validateFields,
  async (req, res, next) => {
    try {
      const { userId, name, email, password, phno, age } = req.body;
      const result = await registerUser({
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
  }
);

router.post(
  "/login",
  loginUserValidator,
  validateFields,
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const result = await loginUser({ email, password }, next);

      res
        .status(200)
        .header("Authorization", `Bearer ${result.data.token}`)
        .json(result);
    } catch (err) {
      console.log("err", err);
      handleErrors(err, next);
    }
  }
);

router.post("/forgotpassword", async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await forgotPassword({ email });

    res.status(200).json(result);
  } catch (err) {
    handleErrors(err, next);
  }
});

module.exports = router;
