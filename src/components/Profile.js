import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import { Card } from "react-bootstrap";

class Profile extends Component {
  render() {
    const { user } = this.props.auth0;

    return (
      <> {!this.props.auth0.isAuthenticated &&
        <Card className="text-center">
          <Card.Header>Welcome to Can-of-Books</Card.Header>
          <Card.Body>
            <Card.Title>Thank You for Using Our Website </Card.Title>
            <Card.Text>
              Please Log In first so you can access our books!
            </Card.Text>
            <LoginButton />
          </Card.Body>
        </Card>}

        {/* {console.log(this.props.auth0.isAuthenticated)} */}
        {this.props.auth0.isAuthenticated &&
        <Card className="text-center d-flex justify-content-evenly">
          <Card.Img
            variant="top"
            src={user.picture}
            style={{ width: "15rem", height: "15rem" }}
            class="rounded mx-auto d-block"
          />
          <Card.Body>
            <Card.Title>
              <h1> Username: {user.given_name} </h1>{" "}
            </Card.Title>
            <Card.Text>
              <LogoutButton />
            </Card.Text>
          </Card.Body>
        </Card>}
      </>
    );
  }
}

export default withAuth0(Profile);
