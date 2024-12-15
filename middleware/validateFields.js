const { validationResult } = require("express-validator");
const HttpException = require("../Error/Exception");

const validate = (req, res, next) => {
  const errors = validationResult(req);

  console.log("err", errors);
  if (!errors.isEmpty()) {
    return next(
      new HttpException(400, "Unprocessible request entities", errors.array())
    );
  }
  next();
};

module.exports = validate;
