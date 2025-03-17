const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  console.log("tkn in the verify:->", req.cookies);

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("verifyToken Err:", error);
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};

module.exports = verifyToken;