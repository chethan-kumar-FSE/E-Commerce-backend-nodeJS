class HttpException extends Error {
  constructor(errorCode, message, errors) {
    super(message);
    this.errorCode = errorCode;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = HttpException;
