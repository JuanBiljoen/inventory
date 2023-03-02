import { useRef } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";

// Add Product component used by admin
function AddProduct(props) {
  // Useref hooks to store user input
  const nameRef = useRef("");
  const descRef = useRef("");
  const priceRef = useRef("");

  // collecting user input to add product
  function addProductHandler(event) {
    const name = nameRef.current.value;
    const description = descRef.current.value;
    const price = priceRef.current.value;

    // Validation to prevent empty strings
    if (
      !name ||
      onlySpaces(name) ||
      !description ||
      onlySpaces(description) ||
      !price ||
      onlySpaces(price)
    ) {
      alert("All fields must not be empty");
    } else {
      //Product object with necesssary properties
      const product = {
        name: name,
        description: description,
        price: price,
      };
      // Send the object back to MenuPage to be used in adding the Product
      props.onAddProduct(product);
    }
  }

  // This function returns true if a string with only spaces is passed i.e. " "
  function onlySpaces(str) {
    return str.trim().length === 0;
  }

  return (
    <Card>
      <Card.Header><h2>Add a new Product</h2></Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label><h3>Name</h3></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the name of your product"
              ref={nameRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>
              <h3>Description</h3>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter a description of your product"
              ref={descRef}
            />
          </Form.Group>
          <Form.Label><h3>Price</h3></Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>R</InputGroup.Text>
            <Form.Control
              aria-label="Amount (in rands)"
              defaultValue={props.price}
              ref={priceRef}
            />
            <InputGroup.Text>.00</InputGroup.Text>
          </InputGroup>
          <Button variant="primary" type="button" onClick={addProductHandler}>
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddProduct;
