import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert, Button, Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import BestBooks from "./components/BestBooks";
import BookFormModal from "./components/BookFormModal";
import UpdateModal from "./components/UpdateModal";
import Nav from "./components/Nav";
// import Home from "./components/LoginButton";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profile from "./components/Profile";
// import Login from "./components/Login"
import { withAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Home from "./components/Home";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showData: false,
      showModal: false,
      showModalUpdate: false,
      ShowLog: false,
      title: "",
      description: "",
      email: "",
      id: "",
    };
  }

  componentDidMount = async () => {
    const books = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/books`);
    this.setState({
      data: books.data,
    });
    if (this.state.data.length > 0) {
      this.setState({
        showData: true,
      });
    }
    console.log(this.state.data);
  };

  callApi = () => {
    if (this.props.auth0.isAuthenticated) {
      this.props.auth0
        .getIdTokenClaims()
        .then((res) => {
          const jwt = res.__raw;
          const config = {
            headers: { Authorization: `Bearer ${jwt}` },
            method: "get",
            baseURL: process.env.REACT_APP_SERVER_URL,
            url: "/auth",
          };
          axios(config)
            .then((result) => console.log(result.data))
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    } else {
      console.log("user is not authenticated");
    }
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

  Show;

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
        `${process.env.REACT_APP_BACKEND_URL}/create`,
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
      `${process.env.REACT_APP_BACKEND_URL}/delete/${this.state.id}`
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
      `${process.env.REACT_APP_BACKEND_URL}/update/${this.state.id}`,
      bookData
    );

    this.setState({
      showModalUpdate: false,
      data: booksData.data,
    });
  };

  render() {
    console.log(this.props.auth0);
    return (
      <div>
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/">
              <br />
              <br />
              <br />
              <br />
              {!this.props.auth0.isAuthenticated && <Home />}
            </Route>
            <Route exact path="/profile">
              <br />
              <br />
              <br />
              <br />
              {<Profile />}
            </Route>
          </Switch>
        </Router>

        <>
          <br />
          <br />
          <br />
          <br />

          <>
            {this.props.auth0.isAuthenticated && (
              <BestBooks data={this.state.data} deleteBook={this.deleteBook} />
            )}
          </>

          {this.props.auth0.isAuthenticated && (
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
                  <input
                    placeholder="Book Id To Delete"
                    onChange={this.updateId}
                  />
                </Col>
              </Row>
            </Container>
          )}

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
        </>
      </div>
    );
  }
}

export default withAuth0(App);
