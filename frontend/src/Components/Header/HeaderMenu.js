import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { getCookie } from "../../cookieService";

// The Header Menu Component Function
function HeaderMenu(props) {
  // This state dynamically changes the text of the login tab depending if the user has logged in or not
  const [authText, setAuthText] = useState("Login/Sign In");

  // When the user clicks on the logout tab in the Nav bar, clear cookies and session info
  function logoutHandler() {
    // First check if cookies of a token, user ID and the session storage of loggedIn exists
    if (
      getCookie("token") !== "" &&
      getCookie("user") &&
      sessionStorage.getItem("loggedIn")
    ) {
      // Display a confirmation alert asking the user to confirm logging out
      let confirmAction = window.confirm("Are you sure you want to log out?");
      // If the user confirms then clear the cookies, the session storage and change the login tab text
      if (confirmAction) {
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        sessionStorage.clear();
        setAuthText("Login/Sign In");
      }
    }
  }

  // When the displayLogin value changes to false, display the login tab text as Logout
  useEffect(() => {
    if (!props.displayLogin) {
      setAuthText("Logout");
    }
  }, [props.displayLogin]);

  return (
    <Nav variant="tabs" defaultActiveKey="/" justify>
      <Nav.Item className="me-2">
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
      </Nav.Item>
      <Nav.Item className="me-2">
        <NavLink className="nav-link" to="/stocklist">
          Stock
        </NavLink>
      </Nav.Item>
      <Nav.Item className="me-2">
        <NavLink className="nav-link" to="/about">
          About
        </NavLink>
      </Nav.Item>
      <Nav.Item className="me-2">
        <NavLink className="nav-link" to="/contact">
          Contact
        </NavLink>
      </Nav.Item>
      <Nav.Item onClick={logoutHandler} className="me-2">
        <NavLink className="nav-link" to="/auth">
          {authText}
        </NavLink>
      </Nav.Item>
    </Nav>
  );
}

export default HeaderMenu;
