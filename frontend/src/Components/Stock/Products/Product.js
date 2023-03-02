import { useRef, useState } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";

// Product Component where admin can delete/edit products
function Product(props) {
  // Useref hooks to store user input
  const nameRef = useRef("");
  const descRef = useRef("");
  const priceRef = useRef("");

  // The 'disable' state is used to control whether the input fields are enabled or disabled
const [disable, setDisable] = useState(true);

// The 'cancelDisable' state is used to control whether the Cancel button is enabled or disabled
const [cancelDisable, setCancelDisable] = useState(true);

// The 'edit' state is used to control whether the component is in editable mode or not
const [edit, setEdit] = useState(false);

// The 'editBtnText' state is used to set the text of the Edit button
const [editBtnText, setEditBtnText] = useState("Edit Product");

  // function to edit product
  function editProductHandler() {
    // useRef hooks to collect input values
    const name = nameRef.current.value;
    const description = descRef.current.value;
    const price = priceRef.current.value;

    // validation to prevent empty strings
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
        id: props.id,
        name: name,
        description: description,
        price: price,
      };

      // Send the object back to MenuPage to be used in editing the Product
      props.onEditProduct(product);
      setEdit(false);
    }
  }

  // delete  product using the ID 
  function deleteProductHandler() {
    props.onDeleteProduct({ value: props.id });
  }

  // This function is called when the user clicks the edit button
  function clickEditButtonHandler() {
    if (edit) {
      editProductHandler();
      setEditBtnText("Edit Product");
      setCancelDisable(true); // Disable the cancel button
      setDisable(true); // Make the fields disabled
    } else {
      setEdit(true);
      setEditBtnText("Submit");
      setCancelDisable(false); // Enable the cancel button
      setDisable(false); // Make the fields editable
    }
  }

  //function when user clicks delete button
  function clickDeleteButtonHandler() {
    let confirmAction = window.confirm(
      "Are you sure you want to delete this Product?"
    );
    if (confirmAction) {
      // If the user confirms, delete the product
      deleteProductHandler();
    }
  }

  // function when user clicks edit button
  function clickCancelButtonHandler() {
    setEdit(false); // Set the component as uneditable
    setEditBtnText("Edit Product"); // Set the edit button text
    setCancelDisable(true); // Set the cancel button to disabled
    setDisable(true); // Disable the fields
  }

  // This function returns true if a string with only spaces is passed i.e. " "
  function onlySpaces(str) {
    return str.trim().length === 0;
  }

  return (
    <Card>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicModel">
            <Form.Label><h4>Name</h4></Form.Label>
            <Form.Control
              type="text"
              defaultValue={props.name}
              disabled={disable}
              ref={nameRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicMake">
            <Form.Label><h4>Description</h4></Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              defaultValue={props.description}
              disabled={disable}
              ref={descRef}
            />
          </Form.Group>
          <Form.Label><h4>Price</h4></Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>R</InputGroup.Text>
            <Form.Control
              aria-label="Amount (to the nearest dollar)"
              disabled={disable}
              defaultValue={props.price}
              ref={priceRef}
            />
            <InputGroup.Text>.00</InputGroup.Text>
          </InputGroup>
        </Form>
        {props.isAdmin && (
          <div>
            <Button
              className="me-2"
              variant="primary"
              onClick={clickEditButtonHandler}
            >
              {editBtnText}
            </Button>
            <Button
              className="me-2"
              variant="secondary"
              onClick={clickCancelButtonHandler}
              disabled={cancelDisable}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={clickDeleteButtonHandler}>
              Delete Product
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
