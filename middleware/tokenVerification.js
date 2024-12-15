const jwt = require("jsonwebtoken");
const HttpException = require("../Error/Exception");

const verifyTokenMiddleware = async (req, res, next) => {
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
  req.user = decoded;
  next();
};

module.exports = verifyTokenMiddleware;
