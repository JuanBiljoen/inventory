import { useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

// Product Recommendation Component
function RequiredProduct(props) {
  // We use the useRef hooks below to help store the values the user inputs
  const nameRef = useRef("");
  const describeRef = useRef("");
  const vinRef = useRef("");

  // This state is used to enable/disable the input fields
  const [disable, setDisable] = useState(true);
  // This state is used to enable/disable the Cancel button
  const [cancelDisable, setCancelDisable] = useState(true);
  // This state is used to set the component as editable or not
  const [edit, setEdit] = useState(false);
  // This state is used to change the edit button text
  const [editBtnText, setEditBtnText] = useState("Edit");

  // This function handles editing the Product Recommendation
  function editRecommendedProductHandler() {
    // Collect the user input values using the useRef hooks
    const name = nameRef.current.value;
    const describe = describeRef.current.value;
    const vin = vinRef.current.value;

    // Simple validation disallowing empty strings
    if (!name || onlySpaces(name)) {
      alert("Name field must not be empty");
    } else {
      // Create a RecommendedProduct object with necesssary properties
      const product = {
        id: props.id,
        name: name,
        describe: describe,
        vin: vin,
        author: props.userId
      };

      // Send the object back to MenuPage to be used in editing the Product Recommendation
      props.onEditRecommendedProduct(product);
      setEdit(false);
    }
  }

  // Delete the Product Recommendation using the ID of the Product Recommendation
  function deleteRecommendedProductHandler() {
    props.onDeleteRecommendedProduct({ value: props.id });
  }

  // This function is called when the user clicks the edit button
  function clickEditButtonHandler() {
    if (edit) {
      // If the fields are editable
      editRecommendedProductHandler();
      setEditBtnText("Edit");
      setCancelDisable(true); // Disable the cancel button
      setDisable(true); // Make the fields disabled
    } else {
      // If the fields are not editable
      setEdit(true);
      setEditBtnText("Submit");
      setCancelDisable(false); // Enable the cancel button
      setDisable(false); // Make the fields editable
    }
  }

  // This function is called when the user clicks the delete button
  function clickDeleteButtonHandler() {
    // Display a confirmation alert asking the user to confirm deletion
    let confirmAction = window.confirm(
      "Are you sure you want to delete this Recommendation?"
    );
    if (confirmAction) {
      // If the user confirms, delete the product
      deleteRecommendedProductHandler();
    }
  }

  // This function is called when the user clicks the cancel button
  function clickCancelButtonHandler() {
    setEdit(false); // Set the component as uneditable
    setEditBtnText("Edit"); // Set the edit button text
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
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              defaultValue={props.name}
              disabled={disable}
              ref={nameRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicMake">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              defaultValue={props.describe}
              disabled={disable}
              ref={describeRef}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicMake">
            <Form.Label>VIN Number</Form.Label>
            <Form.Control
              type="text"
              defaultValue={props.vin}
              disabled={disable}
              ref={vinRef}
            />
          </Form.Group>
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
              Delete
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default RequiredProduct;
