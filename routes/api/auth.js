const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const User = require("../../models/User");

// @route   GET api/auth
// @desc    Test route
// @access  Public

// Passed in auth middleware to perform json web token validation
router.get("/", auth, async (req, res) => {
  try {
    // Use mongoose in User to parse the DB for the user based on the ID and omit the password
    const user = await User.findById(req.user.id).select("-password");
    // Return the user info in a json
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
