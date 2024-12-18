const { body } = require("express-validator");

const registerUserValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be valid !"),
  body("userId")
    .isLength({ min: 6, max: 6 })
    .withMessage("UserId must be of 6 character length"),
  body("password")
    .notEmpty()
    .withMessage("Password is empty")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast six characters long !")
    .matches(/[0-9]/)
    .withMessage("Password must contain atleast 1 number")
    .matches(/[A-Z]/)
    .withMessage("Password must contain atleast 1 capital"),
  body("confirmPassword"),
  body("phno")
    .notEmpty()
    .withMessage("Phone no is required")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone no must be valid"),
  body("age")
    .notEmpty()
    .withMessage("Age is empty")
    .isInt({ min: 18 })
    .withMessage("Age must be a number and atleast 18"),
];

const loginUserValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be valid!"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Incorrect password")
    .matches(/[0-9]/)
    .withMessage("Incorrect password")
    .matches(/[A-Z]/)
    .withMessage("incorrect password"),
];
module.exports = { registerUserValidator, loginUserValidator };
