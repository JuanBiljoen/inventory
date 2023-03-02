import { Card, Container } from "react-bootstrap";
import FooterMenu from "./FooterMenu"; 
import { Facebook } from "react-bootstrap-icons";

// The Footer Component Function
function Footer(props) {
  return (
    <Container className="footer text-center mb-5">
      <FooterMenu></FooterMenu>
      <Card className="mt-3">
        <Card.Body>
          <h1 style={{ fontStyle: "italic", borderRadius: "10px" }}>
            SA Truck Parts
          </h1>
          <Card.Title>
          <Facebook className="me-1" />
            <Card.Link href="https://www.facebook.com/sacarandtruck" target="_blank" style={{background: "none"}}>Follow us on facebook</Card.Link>
          </Card.Title>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Footer;
