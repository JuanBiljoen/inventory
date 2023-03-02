import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../cookieService";

// This component is responsible for displaying the login/signup page
function AuthComponent(props) {
  // Define states and references to handle user inputs and validations
  const [validated, setValidated] = useState(false); // Indicates if the form has been validated
  const [authMode, setAuthMode] = useState("login"); // Determines which page to show
  const userNameRef = useRef(""); // Stores the username input value
  const emailRef = useRef(""); // Stores the email input value
  const passwordRef = useRef(""); // Stores the password input value

 // Set up a navigation hook to redirect users to other pages
  const navigate = useNavigate();

  // Toggle between login and signup pages
  const changeAuthMode = () => {
    setAuthMode(authMode === "login" ? "signup" : "login");
    emailRef.current.value = "";
    passwordRef.current.value = "";
    if (authMode === "signup") {
      userNameRef.current = "";
    }
  };

// Saves the new user information and adds the user to the database after form submission
  function signUp() {
    // Collect the user input values using useRef hooks
    const userName = userNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Create a User object with necesssary properties
    const user = {
      userName: userName,
      email: email,
      password: password,
    };
   // Sends the User object to the server to be added to the database
    addUserHandler(user);
  }

 // Logs in the user after form submission by checking their credentials with the database
  function login() {
    // Collect the user input values using useRef hooks
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Create a User object with necesssary properties
    const user = {
      email: email,
      password: password,
    };
    // Sends the User object to the server to check if the credentials match the database records
    logInHandler(user);
  }

  // Asynchronous function for adding a User
  async function addUserHandler(user) {
    const response = await fetch("/adduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        // If the email/username already exists, the user was not added. Otherwise save the JWT token as a cookie
        if (!data.saved) {
          alert("That email/username already exists");
        } else {
          alert("New user saved");
          document.cookie = "token=" + data.token;
        }
      });
  }

  // Asynchronous function for Logging a User in to the App
  async function logInHandler(user) {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        alert(
          "Status: " +
            response.status +
            " " +
            response.statusText +
            "\nIncorrect email/password"
        );
      })
      .then((data) => {
        // If the user credentials were verified, save the JWT token, the userId,
        // and the admin value of the user as a cookie
        document.cookie = "token=" + data.token;
        document.cookie = "user=" + data.userId;
        document.cookie = "admin=" + data.isAdmin;
        sessionStorage.setItem("loggedIn", true);
        setAuthMode("loggedIn");
      });
  }

  // This function handles the submit button
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
    } else {
      // Depending on the page displayed, call the relevant function
      if (authMode === "signup") {
        signUp();
      } else if (authMode === "login") {
        login();
      }
    }
    // The form has been validated and styling can be applied
    setValidated(true);
  };

  // If the user has logged in successfully, redirect to the Home page
  useEffect(() => {
    if (authMode === "loggedIn" || isUserLoggedIn()) {
      // When a user logs in successfully, redirect them to the home page and display "Logout" in the Header
      navigate("/");
      props.onLogin();
    }
  }, [authMode]);

  // This function gets the cookies of admin and token, and the value of loggedIn in the session storage,
  // and returns true if they exist
  function isUserLoggedIn() {
    let tokenCheck = getCookie("token");
    let userCheck = getCookie("user");

    return (
      tokenCheck !== "" &&
      userCheck !== "" &&
      sessionStorage.getItem("loggedIn")
    );
  }

  // Display the login page
  if (authMode === "login") {
    return (
      <Card className="auth">
        <Card.Title
          className="ms-3 mt-3 me-3"
          style={{
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <h3>Sign In</h3>
          <div className="auth-sign">
            Not Registered?{" "}
            <span
              style={{
                color: "#fdeed9",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={changeAuthMode}
            >
              Sign Up
            </span>
          </div>
        </Card.Title>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group controlId="signInValidationEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Email"
                  ref={emailRef}
                />
                <Form.Control.Feedback type="invalid">
                  Please Enter a Valid Email
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group controlId="signInValidationPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  ref={passwordRef}
                />
                <Form.Control.Feedback type="invalid">
                  Please Enter a Password
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button type="submit">Submit form</Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }

  // Display the sign in page
  if (authMode === "signup") {
    return (
      <Card className="auth">
        <Card.Title
          className="ms-3 mt-3 me-3"
          style={{
            border: "1px solid grey",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <h3>Sign In</h3>
          <div className="auth-sign">
            Already Registered?{" "}
            <span
              style={{
                color: "#fdeed9",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={changeAuthMode}
            >
              Sign In
            </span>
          </div>
        </Card.Title>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group controlId="signUpValidationName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="John Doe"
                  ref={userNameRef}
                />
                <Form.Control.Feedback type="invalid">
                  Please fill in this field
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group controlId="signUpValidationEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Email Address"
                  ref={emailRef}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group controlId="signUpValidationPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  ref={passwordRef}
                />
                <Form.Control.Feedback type="invalid">
                  Please fill in this field
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button type="submit">Submit form</Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card body className="mb-3 auth">
      <h1>Welcome!</h1>
      <Button>Logout</Button>
    </Card>
  );
}

export default AuthComponent;
