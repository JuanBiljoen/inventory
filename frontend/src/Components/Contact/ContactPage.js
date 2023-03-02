import { useRef } from "react";
import { Button, Card, Container, Form, Stack } from "react-bootstrap";

// This page will allow the user enter their details that will be sent to the business 
function ContactPage(props) {
  // We use the useRef hooks below to help store the values the user inputs
  let nameRef = useRef("");
  let surnameRef = useRef("");
  let emailRef = useRef("");
  let phoneRef = useRef("");
  let additionalRef = useRef("");

 
  function submitContactInfo() {
    // Collect the user input values using the useRef hooks
    const name = nameRef.current.value;
    const surname = surnameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const additionalInfo = additionalRef.current.value;

    // Create a contact object with necesssary properties
    const contact = {
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      additionalInfo: additionalInfo,
    };
   
    addContactHandler(contact);
  }

  // function for adding a user's details
  async function addContactHandler(contact) {
    const response = await fetch("/addcontact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        // The data received can only be true or false. Display an appropriate message to the user for either
        if (data) {
          alert("Your details were succesfully submitted");
        } else {
          alert("Something went wrong, please try again later.");
        }
      });
  }

  return (
    <Container style={{ marginTop: "15px" }} className="contact">
      <Card body className="mb-3">
        <h1>Contact Us</h1>
      </Card>
      <Stack
        direction="horizontal"
        className="mb-3"
        style={{ justifyContent: "center" }}
      >
        <Card className="me-3">
          <Card.Body>
            <Card.Title>Name</Card.Title>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control type="text" placeholder="Your Name" ref={nameRef} />
            </Form.Group>
          </Card.Body>
        </Card>
        <Card className="me-3">
          <Card.Body>
            <Card.Title>Surname</Card.Title>
            <Form.Group className="mb-3" controlId="formBasicSurname">
              <Form.Control
                type="text"
                placeholder="Your Surname"
                ref={surnameRef}
              />
            </Form.Group>
          </Card.Body>
        </Card>
        <Card className="me-3">
          <Card.Body>
            <Card.Title>Email</Card.Title>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Your Email"
                ref={emailRef}
              />
            </Form.Group>
          </Card.Body>
        </Card>
        <Card className="me-3">
          <Card.Body>
            <Card.Title>Phone</Card.Title>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Control
                type="text"
                placeholder="Your Phone Number"
                ref={phoneRef}
              />
            </Form.Group>
          </Card.Body>
        </Card>
      </Stack>

      <Card className="p-3">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicAdditionalInfo">
            <Form.Label>Additional Info</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Additonal Information"
              ref={additionalRef}
            />
          </Form.Group>
          <Button variant="primary" type="button" onClick={submitContactInfo}>
            Submit
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default ContactPage;
