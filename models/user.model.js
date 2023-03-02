const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// User Schema for mongoose
let UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    // The email for a user will be unique and case insensitive, i.e. john@email.com is the same as JOHN@email.com
    email: {
      type: String,
      index: true,
      unique: true,
      required: true,
      uniqueCaseInsensitive: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    },
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);
