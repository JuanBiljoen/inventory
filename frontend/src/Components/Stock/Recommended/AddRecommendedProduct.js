import { useRef } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { getCookie } from "../../../cookieService";

// component to add/ enquire products
function AddRecommendedProduct(props) {
  //useRef hooks to store input value
  const nameRef = useRef("");
  const describeRef = useRef("");
  const vinRef = useRef("");

  // function to store user input and show added/enquired products
  function addRecommendationHandler(event) {
    const name = nameRef.current.value;
    const describe = describeRef.current.value;
    const vin = vinRef.current.value;
    const userId = getCookie("user");

    // validation to prevent empty strings
    if (!name || onlySpaces(name)) {
      alert("Product Name must not be empty");
    } else {
      // product object with necesssary properties
      const recommendation = {
        name: name,
        describe: describe,
        vin: vin,
        author: userId,
      };
      // Send the object back to App.js to be used in adding the recommendation
      props.onAddRecommendedProduct(recommendation);
    }
  }

  // This function returns true if a string with only spaces is passed i.e. " "
  function onlySpaces(str) {
    return str.trim().length === 0;
  }
  return (
    <Container>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Product Enquiries</Card.Title>
          <Card.Text>
            Enquire on any part you don't find in our stocklist
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="p-3 suggestion-card">
        <Form className="suggestion-form">
          <Form.Group className="mb-3" controlId="formBasicProduct">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Product Name"
              ref={nameRef}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicRecipeLink">
            <Form.Label>Product description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Product description"
              ref={describeRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicVisualLink">
            <Form.Label>VIN Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter VIN number"
              ref={vinRef}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="button"
            onClick={addRecommendationHandler}
          >
            Submit
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default AddRecommendedProduct;
