import React, { Component } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import { withAuth0 } from '@auth0/auth0-react';

export class Nav extends Component {
  render() {
    return (
        <Navbar  expand="xxl" bg="dark" variant="dark"  >
        <Navbar.Brand>Can-of-Books</Navbar.Brand>
        <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          {(this.props.auth0.isAuthenticated) ? <LogoutButton/> : <LoginButton/>}
      </Navbar>
    );
  }
}

export default withAuth0(Nav);


