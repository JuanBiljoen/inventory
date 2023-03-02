import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

// The Footer Menu Component Function
function FooterMenu(props) {
  return (
    <Nav variant="tabs" justify>
      <Nav.Item className="me-2">
        <NavLink className="nav-link" to="/about">
          Location
        </NavLink>
      </Nav.Item>
      <Nav.Item className="me-2">
        <NavLink className="nav-link" to="/about">
          Delivery
        </NavLink>
      </Nav.Item>
      <Nav.Item >
        <NavLink className="nav-link" to="/about">
          FAQ
        </NavLink>
      </Nav.Item>
    </Nav>
  );
}

export default FooterMenu;
