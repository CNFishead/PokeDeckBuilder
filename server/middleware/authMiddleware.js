const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const DB = require("../config/db");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.db = await new DB(
        process.env.MONGO_URI,
        process.env.DBNAME
      ).connect();
      req.user = await req.db
        .collection("users")
        .findOne({ id: decoded._id });
      // * Using this method of connecting to the DB we cant .select('-password') we need to remove it manually.
      // * This will set the field to undefined.
      req.user.password = undefined;

      next();
    } catch (e) {
      console.log("failed here...");
      res.status(403).json({ message: "Not authorized, token failed" });
    }
  }
  if (!token) {
    console.log("No token");
    res.status(403).json({ message: "Not authorized, token failed" });
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Not authorized Admin" });
  }
};

module.exports = { protect, admin };
