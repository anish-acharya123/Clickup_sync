const JWT = require("jsonwebtoken");

const generateJWT = (user) => {
  const payload = {
    email: user.email,
  };

  const token = JWT.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};

module.exports = generateJWT;
