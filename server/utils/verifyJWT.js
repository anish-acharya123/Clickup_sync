const JWT = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  try {
    const allToken = req.headers.cookie;
    const token = allToken.split(" ")[1].split("=")[1].replace(";", "");
    // console.log(token);
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication token not found" });
    }

    // console.log(process.env.JWT_SECRET);
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // Add a custom `user` property to `req`
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyJWT;
