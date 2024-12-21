const { body } = require("express-validator");

const productValidationRules = [
  body("productId")
    .isString()
    .withMessage("Product ID must be a string")
    .isLength({ min: 10, max: 10 })
    .withMessage("Product ID must be exactly 10 characters long")
    .matches(/^prod_[a-zA-Z]{2}\d{3}$/)
    .withMessage("Product ID must follow the format prod_[a-zA-Z]{2}\\d{3}"),

  body("productName")
    .isString()
    .withMessage("Product name must be a string")
    .notEmpty()
    .withMessage("Product name is required"),

  body("category")
    .isString()
    .withMessage("Category must be a string")
    .isIn(["electronics", "kitchen", "cosmetics"])
    .withMessage("Category must be one of electronics, kitchen, or cosmetics"),

  body("description")
    .isString()
    .withMessage("Description must be a string")
    .notEmpty()
    .withMessage("Description is required"),

  body("currentStock")
    .isInt({ min: 0 })
    .withMessage("Current stock must be a positive integer"),

  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),

  body("manufacturer")
    .isString()
    .withMessage("Manufacturer must be a string")
    .notEmpty()
    .withMessage("Manufacturer is required"),

  body("placeOfOrigin")
    .isString()
    .withMessage("Place of origin must be a string")
    .notEmpty()
    .withMessage("Place of origin is required"),

  body("warranty")
    .isString()
    .withMessage("Warranty must be a string")
    .notEmpty()
    .withMessage("Warranty is required"),

  body("shouldDisplay")
    .optional()
    .isBoolean()
    .withMessage("ShouldDisplay must be a boolean"),

  body("overAllRating")
    .isFloat({ min: 0, max: 5 })
    .withMessage("Overall rating must be a number between 0 and 5"),
];

module.exports = { productValidationRules };
