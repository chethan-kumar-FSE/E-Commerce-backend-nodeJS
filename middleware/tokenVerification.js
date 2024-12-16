const jwt = require("jsonwebtoken");
const HttpException = require("../Error/Exception");

module.exports = verifyTokenMiddleware;
