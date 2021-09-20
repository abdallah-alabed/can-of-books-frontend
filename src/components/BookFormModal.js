import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";

class BookFormModal extends Component {
    
  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.closeModalFx} >
        <Modal.Header>
          <Modal.Title>Fill the Data Below To Add a Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.props.addBook}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Book Title</Form.Label>
              <Form.Control type="input" placeholder="Book Title" onChange={this.props.updateBookName}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Book Description</Form.Label>
              <Form.Control type="input" placeholder="Book Description" onChange={this.props.updateDescription}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Your Email</Form.Label>
              <Form.Control type="email" placeholder="Your Email" onChange={this.props.updateEmail}/>
            </Form.Group>
            <Button variant="success" type="submit">
            Add Book!
          </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.closeModalFx}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

}

export default BookFormModal;
