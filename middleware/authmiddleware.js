// authmiddleware.js 

const jwt = require("jsonwebtoken");
require("dotenv").config();
// const { JWT_SECRET } = require("../config");
const JWT_SECRET = process.env.JWT_SECRET;

const mongoose = require("mongoose");
const UserModel = mongoose.model("UserModel");

// Export a middleware function to authenticate

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // Check if there's no 'authorization' header in the request
  if (!authorization) {
    return res.status(401).json({ error: "User not logged in" });
  }

  const token = authorization.replace("Bearer ", "").trim();

  jwt.verify(token, JWT_SECRET, (error, payload) => {
    console.log(token);
    // if (error) {
    //   console.error(error);
    //   return res.status(401).json({ error: "User not logged in" });
    // }
    if (error) {
      // Check if the error is due to token expiration
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expired" });
      } else {
        console.error(error);
        return res.status(401).json({ error: "Invalid token" });
      }
    }
    
    const { _id } = payload;

    UserModel.findById(_id)
      .then((dbUser) => {
        if (!dbUser) {
          return res.status(401).json({ error: "User not found" });
        }
        req.user = dbUser;
        next();
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  });
};
