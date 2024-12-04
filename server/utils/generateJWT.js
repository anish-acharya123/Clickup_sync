const JWT = require("jsonwebtoken");

const generateJWT = (user) => {
  const payload = {
    name: user.name,
    email: user.email,
    clickupToken: user.clickupToken,
    githubToken: user.githubToken,
  };

  const token = JWT.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};

module.exports = generateJWT;
