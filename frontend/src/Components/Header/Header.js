import { Container, Row } from "react-bootstrap";
import HeaderMenu from "./HeaderMenu"; // Header Menu Component for navigation

// The Header Component Function
function Header(props) {
  return (
    <Container className="header">
      <Row>
        <HeaderMenu displayLogin={props.displayLogin}></HeaderMenu>
      </Row>
    </Container>
  );
}

export default Header;
