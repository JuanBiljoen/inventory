import { Card, Container, Stack } from "react-bootstrap";
import { Facebook } from "react-bootstrap-icons";

//landing page 
function HomePage(props) {
  const truck1 = require("./../../resources/images/truck1.jpg");
  const truck2 = require("./../../resources/images/truck2.jpg");

  return (
    <Container style={{ marginTop: "15px" }} className="home">
      <Card body className="text-center">
        <h1 style={{ fontStyle: "italic", fontSize: "52px" }}>
          Welcome to SA Truck Parts
        </h1>
      </Card>
      <Stack direction="horizontal" className="mb-3 image-stack" gap={2}>
        <Stack direction="vertical">
          <Card.Img
            src={truck1}
            style={{ maxHeight: "400px" }}
          />
        </Stack>
        <Stack direction="vertical">
          <Card.Img
            src={truck2}
            style={{ maxHeight: "400px" }}
          />
        </Stack>
      </Stack>
      <Card>
        <Card.Body className="text-center">
          <Facebook
            className="me-1"
            style={{ fontSize: "32px", marginTop: "-12px" }}
          />
          <Card.Link
            style={{ fontSize: "32px" }}
            href="https://www.facebook.com/sacarandtruck"
            target="_blank"
          >
            Follow us on Facebook!
          </Card.Link>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default HomePage;
