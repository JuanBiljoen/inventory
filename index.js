// Include the express module
const express = require("express");

// Create an object by calling the express function
const app = express();
app.use(express.static("public"));
//To access data sent in the body of an HTTP request using Express server, we need to use the body-parser middleware. This middleware extracts the body part of the incoming request and makes it available in the req.body object.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Include the mongoose module to connect to the DB
const mongoose = require("mongoose");
// Get the product.controller object to perform CRUD operations
const productController = require("./controllers/product.controller");
// Get the user.controller object to perform CRUD operations
const userController = require("./controllers/user.controller");
// Get the recommendedProduct.controller object to perform CRUD operations
const recommendedController = require("./controllers/recommendedProduct.controller");
// Get the contact.controller object to perform CRUD operations
const contactController = require("./controllers/contact.controller");
// Include JWT to return and verify tokens
const jwt = require("jsonwebtoken");
// Include dotenv to change environment variables easier
require("dotenv").config();
const path = require("path");

const cors = require("cors");

// To get the port number from the environment variables instead of hardcoding
// it, we use the following code:
const PORT = process.env.PORT || 8080;

//for connecting frontend and backend
app.use(cors());

//database connnection goes here
require("./db/connection");

//creating port
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

// ===================================
// LOGIN AND SIGN UP FUNCTIONALITY
// ===================================
// Call the function when a user attempts to log in
app.post("/login", (req, res) => {
  // Get the user's email and password from the body
  const userEmail = req.body.email;
  const pwd = req.body.password;
  // Use the controller to find the user with the given email and password combination
  const users = userController.findUser(userEmail, pwd).then((response) => {
    // If the frontend validation fails we can still return a 403
    if (response !== null) {
      // Use a payload to create a JWT token for the user login
      let payload = {
        email: response.email,
        username: response.username,
        loggedIn: true,
        isAdmin: response.isAdmin,
      };
      const token = jwt.sign(JSON.stringify(payload), "jwt-secret", {
        algorithm: "HS256",
      });
      // Return the JWT token, a boolean that the user is logged in, the user's ID, and the user's admin value
      res.send({
        token: token,
        loggedIn: true,
        userId: response._id,
        isAdmin: response.isAdmin,
      });
    } else {
      res.status(403).send({ err: "Incorrect login!" });
    }
  });
});

// POST
app.post("/adduser", (req, res) => {
  // Create a user object from the body
  const user = {
    username: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  };
  // Use the controller to add the user object.
  const users = userController.addUser(user).then((response) => {
    // The responseToFront object is the response we would send to the front end
    // It will contain the token and a boolean of if the user was added successfully
    let responseToFront = {};
    if (response.saved) {
      const token = jwt.sign(JSON.stringify(user), "jwt-secret", {
        algorithm: "HS256",
      });
      responseToFront = {
        saved: response.saved,
        token: token,
      };
    } else {
      responseToFront = {
        saved: response.saved,
      };
    }
    res.send(responseToFront);
  });
});
// ====================================
// LOGIN AND SIGN UP FUNCTIONALITY END
// ====================================
// ________________________________________________________________

// ===========================
// PRODUCT CRUD FUNCTIONALITY
// ===========================

// POST
app.post("/allproducts", function (req, res) {

  // Get all the products available to buy
  const products = productController.findAllProducts().then((response) => {
    res.send(response);
  });
});

// Route handler to POST and add a product
app.post("/addproduct", (req, res) => {
  // extract the token from the header
  const auth = req.headers["authorization"];
  const token = auth.split(" ")[1];
  try {
    // Decode the JWT token to verify it.
    const decoded = jwt.verify(token, "jwt-secret");

    // If the token is verified with no errors caught
    // Create a product object and add it to the DB
    const product = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    };
    const products = productController.addProduct(product).then((response) => {
      res.send(response);
    });
  } catch (err) {
    res.status(401).send({ err: "Bad JWT!" });
  }
});

// Route handler to PUT and edit a product
app.put("/editproduct", (req, res) => {
  // First extract the toke nfrom the header
  const auth = req.headers["authorization"];
  const token = auth.split(" ")[1];
  try {
    // Decode the JWT token to verify it.
    const decoded = jwt.verify(token, "jwt-secret");

    // If the token is verified with no errors caught
    // Create a product object from the body values and update it in the DB
    const product = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    };

    const products = productController
      .updateProduct(product)
      .then((response) => {
        res.send(response);
      });
  } catch (err) {
    res.status(401).send({ err: "Bad JWT!" });
  }
});

// Route handler to DELETE and remove a product
app.delete("/deleteproduct", (req, res) => {
  // First extract the token from the header
  const auth = req.headers["authorization"];
  const token = auth.split(" ")[1];
  try {
    // Decode the JWT token to verify it.
    const decoded = jwt.verify(token, "jwt-secret");

    // If the token is verified with no errors caught
    // Delete the product using the product's ID and the user's ID
    const products = productController
      .deleteProduct(req.body.productId, req.body.userId)
      .then((response) => {
        res.send(response);
      });
  } catch (err) {
    res.status(401).send({ err: "Bad JWT!" });
  }
});

// ===============================
// PRODUCT CRUD FUNCTIONALITY END
// ===============================
// __________________________________________________

// ==============================================
// PRODUCT RECOMMENDATION CRUD FUNCTIONALITY
// ==============================================

// Route handler to POST and return all the product recommendations
app.post("/allrecommended", function (req, res) {
  // First extract the token from the header
  const auth = req.headers["authorization"];
  const token = auth.split(" ")[1];
  try {
    // Decode the JWT token to verify it.
    const decoded = jwt.verify(token, "jwt-secret");

    // If the token is verified with no errors caught
    // Extract the user's ID and get all product recommendations made by that user
    const recommended = recommendedController
      .findAllRecommendedProducts(req.body.userId)
      .then((response) => {
        res.send(response);
      });
  } catch (err) {
    res.status(401).send({ err: "Bad JWT!" });
  }
});

// Route handler to POST and add a product recommendation
app.post("/addrecommended", (req, res) => {
  // First extract the token from the header
  const auth = req.headers["authorization"];
  const token = auth.split(" ")[1];
  try {
    // Decode the JWT token to verify it.
    const decoded = jwt.verify(token, "jwt-secret");

    // If the token is verified with no errors caught
    // Create a product recommendation object and add it to the DB
    const recommendation = {
      name: req.body.name,
      describe: req.body.describe,
      vin: req.body.vin,
      author: req.body.author,
    };
    const recommendations = recommendedController
      .addRecommendedProduct(recommendation)
      .then((response) => {
        res.send(response);
      });
  } catch (err) {
    res.status(401).send({ err: "Bad JWT!" });
  }
});

// Route handler to DELETE and remove a product recommendation
app.delete("/deleterecommended", (req, res) => {
  // First extract the token from the header
  const auth = req.headers["authorization"];
  const token = auth.split(" ")[1];
  try {
    // Decode the JWT token to verify it.
    const decoded = jwt.verify(token, "jwt-secret");

    // If the token is verified with no errors caught
    // Delete the product recommendation using the product recommendation's ID and the product recommendation's ID
    const recommendations = recommendedController
      .deleteRecommendedProduct(req.body.recommendedId, req.body.userId)
      .then((response) => {
        res.send(response);
      });
  } catch (err) {
    res.status(401).send({ err: "Bad JWT!" });
  }
});

// Route handler to PUT and edit a product recommendation
app.put("/editrecommended", (req, res) => {
  // First extract the token from the header
  const auth = req.headers["authorization"];
  const token = auth.split(" ")[1];
  try {
    // Decode the JWT token to verify it.
    const decoded = jwt.verify(token, "jwt-secret");

    // If the token is verified with no errors caught
    // Create a product recommendation object from the body values and update it in the DB
    const recommended = {
      id: req.body.id,
      name: req.body.name,
      describe: req.body.describe,
      vin: req.body.vin,
      author: req.body.author,
    };

    const recommendations = recommendedController
      .updateRecommendedProduct(recommended)
      .then((response) => {
        res.send(response);
      });
  } catch (err) {
    res.status(401).send({ err: "Bad JWT!" });
  }
});

// ==============================================
// PRODUCT RECOMMENDATION CRUD FUNCTIONALITY END
// ==============================================
// __________________________________________________

// ===============================
// ADD CONTACT CRUD FUNCTIONALITY
// ===============================

// Route handler to POST and add contact information
app.post("/addcontact", (req, res) => {
  // Any user can add their contact information so a JWT is not
  // needed to verify

  // Create a contact object and add it to the DB
  const contact = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    phone: req.body.phone,
    additionalInfo: req.body.additionalInfo,
  };

  // We just sending back a boolean representing if the info was added to the DB
  const contacts = contactController.addContact(contact).then((response) => {
    res.send(response);
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// Route handler if the user enters an unknown path
app.get("*", function (req, res, next) {
  // Error object with error message
  let err = new Error("Sorry! Can't find that resource. Please check your URL");
  err.statusCode = 404; // Error status code
  // Display the error message on the web page
  res.status(err.statusCode).send(err.message);
});
