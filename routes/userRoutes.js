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
  resetPassword,
} = require("../controllers/userController");
const handleErrors = require("../Error/ErrorHandler");

const router = express.Router();

router.post("/register", registerUserValidator, validateFields);

router.post("/login", loginUserValidator, validateFields, loginUser);

router.post("/register", registerUser);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:token", resetPassword);
/* router.post("/forgotpassword", async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await forgotPassword({ email });

    res.status(200).json(result);
  } catch (err) {
    handleErrors(err, next);
  }
}); */

module.exports = router;
