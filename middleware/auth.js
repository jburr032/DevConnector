/** Middleware retrieves the token in the request header then checks that it is a valid token to return the user info by passing the
 * token in with the jwtSecret
 */

const jwt = require("jsonwebtoken");
const config = require("config");

// Will call this funciton and pass in req, res and next
module.exports = function (req, res, next) {
  // Get x-auth-token from header
  const token = req.header("x-auth-token");
  // Check if no token
  if (!token) {
    // Use .status() method in the res object
    return res.status(401).json({ msg: "No token, authorization denied." });
  }

  // If there is a token then...
  try {
    // Call .verify() of jwt to calculate the token and jwtSecret; this will return the info within the token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // Decode the token to get the user ID, then re-assign req.user
    req.user = decoded.user;

    next();
  } catch (err) {
    // No return needed as catch implicitly returns the value?
    res.status(401).json({ msg: "Token is not valid" });
  }
};
