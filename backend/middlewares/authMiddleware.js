const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).send("Access denied");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("_id email role status");
    if (!user) return res.status(401).send("User no longer exists");
    if (user.status === "Inactive") return res.status(403).send("Account is inactive");
    req.user = { id: user._id, email: user.email, role: user.role };
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send("Invalid token");
  }
};

module.exports = authMiddleware;
