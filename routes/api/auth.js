const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const config = require("config");
const jsonWT = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// Import the User schema object
const User = require("../../models/User");

// @route   GET api/auth
// @desc    Test route
// @access  Public

// Passed in auth middleware to perform json web token validation
// Assuming that router.get() has the req/res args; unsure how we actually call router.get() and .post() - but seems to be based on the path provided
// Handles GET request to retrieve profile using auth middleware (JWT)
router.get("/", auth, async (req, res) => {
  try {
    // Use mongoose in User to parse the DB for the user based on the ID and omit the password
    const user = await User.findById(req.user.id).select("-password");
    // Respond with the user info in a json
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/** Method to post sign-in email and password */

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required.").exists(),
  ],
  async (req, res) => {
    // Extracts the validation errors from a request and makes them available in a Result object;
    // Result object: An object that holds the current state of validation errors in a request and allows access to it in a variety of ways
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Request object .body attribute has all of the request info in the body
    const { email, password } = req.body;

    // User.findOne (an abstraction of mongoose schema object) returns a promise
    try {
      let user = await User.findOne({ email });

      // If no user is found...
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Returns a bool
      const isMatch = await bcrypt.compare(password, user.password);

      // If isMatch is false...
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // jwt.sign() takes in an object for the payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      //
      jsonWT.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        // Callback on how to handle err or jwt
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
