import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert, Button, Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import BestBooks from "./components/BestBooks";
import BookFormModal from "./components/BookFormModal";
import UpdateModal from "./components/UpdateModal";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showData: false,
      showModal: false,
      showModalUpdate: false,
      title: "",
      description: "",
      email: "",
      id: "",
    };
  }

  componentDidMount = () => {
    axios
      .get(`http://${process.env.REACT_APP_BACKEND_URL}/books`)
      .then((response) => {
        this.setState({
          data: response.data,
        });
        if (this.state.data.length > 0) {
          this.setState({
            showData: true,
          });
        }
        console.log(this.state.data);
      });
  };

  handleShowModal = () => {
    this.setState({
      showModal: true,
    });
  };
  handleShowModalUpdate = () => {
    this.setState({
      showModalUpdate: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };
  handleCloseModalUpdate = () => {
    this.setState({
      showModalUpdate: false,
    });
  };

  updateBookName = (event) => {
    this.setState({
      title: event.target.value,
    });
    console.log(this.state.title);
  };
  updateDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
    console.log(this.state.description);
  };
  updateEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
    console.log(this.state.email);
  };
  updateId = (event) => {
    this.setState({
      id: event.target.value,
    });
    console.log(this.state.id);
  };

  addBook = async (event) => {
    const bookFromData = {
      title: this.state.title,
      description: this.state.description,
      email: this.state.email,
    };

    if (
      this.state.title === "" ||
      this.state.description === "" ||
      this.state.email === ""
    ) {
      <Alert variant="warning">
        Book Details are not complete, please refill the required data
      </Alert>;
    } else {
      let newBooks = await axios.post(
        `http://${process.env.REACT_APP_BACKEND_URL}/create`,
        bookFromData
      );

      this.setState({
        data: newBooks.data,
        showModal: false,
      });
    }
  };

  deleteBook = async (event) => {
    let newBooks = await axios.delete(
      `http://${process.env.REACT_APP_BACKEND_URL}/delete/${this.state.id}`
    );

    this.setState({
      data: newBooks.data,
    });
  };

  updateBook = async (event) => {
    event.preventDefault();

    const bookData = {
      title: this.state.title,
      description: this.state.description,
      email: this.state.email,
    };
    console.log(this.state.id);

    let booksData = await axios.put(
      `http://${process.env.REACT_APP_BACKEND_URL}/update/${this.state.id}`,
      bookData
    );

    this.setState({
      showModalUpdate: false,
      data: booksData.data,
    
    });
  };
  render() {
    return (
      <div className="bg-secondary">
        {this.state.showData && (
          <BestBooks data={this.state.data} deleteBook={this.deleteBook} />
        )}
        {!this.state.showData && (
          <Alert variant="warning">book collection is empty.</Alert>
        )}
        <Container>
          <Row>
            <Col xs={3} md={{ span: 3, offset: 0 }}>
              <Button size="lg" onClick={this.handleShowModal}>
                {" "}
                Add Book!
              </Button>{" "}
            </Col>
            <Col xs={3} md={{ span: 3, offset: 0 }}>
              <Button
                size="lg"
                variant="success"
                onClick={this.handleShowModalUpdate}
              >
                {" "}
                Update Book!
              </Button>{" "}
            </Col>
            <Col xs={6} md={{ span: 4 }}>
              {" "}
              <Button size="lg" variant="danger" onClick={this.deleteBook}>
                {" "}
                Delete Book!
              </Button>
              <input placeholder="Book Id To Delete" onChange={this.updateId} />
            </Col>
          </Row>
        </Container>

        {this.state.showModal && (
          <BookFormModal
            closeModalFx={this.handleCloseModal}
            showModal={this.state.showModal}
            updateBookName={this.updateBookName}
            updateDescription={this.updateDescription}
            updateEmail={this.updateEmail}
            addBook={this.addBook}
          />
        )}

        {this.state.showModalUpdate && (
          <UpdateModal
            closeModalFx={this.handleCloseModalUpdate}
            showModalUpdate={this.state.showModalUpdate}
            updateBookName={this.updateBookName}
            updateDescription={this.updateDescription}
            updateEmail={this.updateEmail}
            updateId={this.updateId}
            updateBook={this.updateBook}
          />
        )}
      </div>
    );
  }
}

export default App;
