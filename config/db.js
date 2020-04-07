// Import requirements
const mongoose = require("mongoose");
const config = require("config");
// Get the mongoURI to access the db
const db = config.get("mongoURI");

/// mongoose.connect() returns a promise, so we need to use async/await
const connectDB = async () => {
  try {
    // Requires the mongoURI
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
