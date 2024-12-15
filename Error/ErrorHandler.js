const HttpException = require("./Exception");

const handleErrors = (err, next) => {
  /* if(err.statusCode===401){
    return next(new HttpException)
  } */
  if (err.code === 11000) {
    // Handle duplicate key error (MongoDB)
    const [key, value] = Object.entries(err.keyValue)[0];
    return next(
      new HttpException(
        409,
        `Conflict: ${key} '${value}' is already present, please choose a different one`
      )
    );
  }

  if (err.name === "ValidationError") {
    // Handle validation errors
    return next(
      new HttpException(400, "Unprocessable request entity", {
        ...err.errors,
      })
    );
  }

  /* if (err?.message) {
    return next(new HttpException(err.statusCode, err.message));
  }
 */
  // Handle generic errors
  return next(new HttpException(500, "Internal server error"));
};

module.exports = handleErrors;
