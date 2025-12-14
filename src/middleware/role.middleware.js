const User = require("../models/User");

const adminOnly = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user || user.role !== "ADMIN") {
    return res.status(403).json({
      message: "Access denied",
    });
  }

  next();
};

module.exports = adminOnly;
