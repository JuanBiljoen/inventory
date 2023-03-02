// In this file, you will find all the code needed to perform CRUD operations using Mongoose. 
//After performing any CRUD operation, we return an array of all the documents in the DB.

//importing model, mongoose and bcrypt
const User = require("../models/user.model.js");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

exports.addUser = async function (user) {
  let response = {
    saved: false,
  };
  // Create and Save a new user
  let userModel = new User({
    username: user.username,
    email: user.email,
    isAdmin: false,
  });
  // Hash the plain text password before saving it
  let hashedPassword = hashPassword(user.password);

  userModel.password = await hashedPassword;
  try {
    // If the response is not saved return false to display appropriate error messages on the frontend
    let newUser = await userModel.save();
    response.saved = true;
    if (newUser) return response;
  } catch (error) {
    return response;
  }
};

// Get all the user documents in the DB
exports.findUser = async function (email, password) {
  let response = null;
  
  try {
    const user = await User.findOne({ email: email }) // Emails are unqiue and case sensitive
      .exec()
      .then((result) => {
        return result;
      });

      // After the email check has passed, complete a password check
    const check = await passwordCheck(password, user.password).then(
      (result) => {
        return result;
      }
    );

    // If the password is correct, send the user document as a response
    if (check) {
      response = user;
    }

    return response;
  } catch (error) {
    return response;
  }
};

// This function uses bcrypt to salt and hash the plain text password to save on the DB
async function hashPassword(passwordToHash) {
  const newHash = bcrypt.hash(passwordToHash, 10).then(function (hash) {
    return hash;
  });
  return newHash;
}

// This function takes a plain text password and a hashed password from the DB
// Then using bcrypt we compare the plain text password (as a hash) against the hashed password from the DB
// If they match, return true
function passwordCheck(passwordRecieved, hashToCompare) {
  const result = bcrypt
    .compare(passwordRecieved, hashToCompare)
    .then(function (result) {
      return result;
    });
  return result;
}
