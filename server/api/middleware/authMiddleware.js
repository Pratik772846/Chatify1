const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

module.exports = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(token);
      console.log(req.body.userId);
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      // console.log(decoded.userId);
      console.log(
        "decoded id from authMiddleware.js: " + JSON.stringify(decoded.userId)
      )
      req.user = await User.findById(decoded.userId).select("-password");
      console.log("req.user from authMiddleware.js: " + JSON.stringify(req.user));
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
