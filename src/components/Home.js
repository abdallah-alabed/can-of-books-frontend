import React, { Component } from "react";
// import { Form } from 'react-bootstrap'
// import LoginButton from "./LoginButton";
import {Card} from 'react-bootstrap'
import LoginButton from "./LoginButton";


class Home extends Component {
  render() {
    return (
      <div>
        <Card className="text-center">
          <Card.Header>Welcome to Can-of-Books</Card.Header>
          <Card.Body>
            <Card.Title>Thank You for Using Our Website </Card.Title>
            <Card.Text>
              Please Log In first so you can access our books!
            </Card.Text>
            <LoginButton />
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Home;
