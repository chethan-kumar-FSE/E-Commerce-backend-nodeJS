const jwt = require("jsonwebtoken");

const generateToken = ({ userId, email, phno, name }) => {
  return jwt.sign(
    { user: { userId, email, phno, name } },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "60d",
    }
  );
};

module.exports = { generateToken };
