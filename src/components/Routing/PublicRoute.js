import React from 'react';
import { Route, Redirect, NavLink } from 'react-router-dom';
import { Container, Navbar, Nav, Row } from 'react-bootstrap';

import { isAuthenticated } from '../../authentication';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {

  return (
    <Route {...rest} render={props => (
      isAuthenticated() && restricted ?
        <Redirect to="/dashboard" /> :
        <Container>
          <Row>
            <Navbar bg="light" expand="lg">
              <Nav className="mr-auto">
                <Navbar.Brand>Users Management</Navbar.Brand>
                <Nav.Link as={NavLink} to="/sign-in">Sign in</Nav.Link>
                <Nav.Link as={NavLink} to="/sign-up">Sign up</Nav.Link>
              </Nav>
            </Navbar>
          </Row>
          <Row>
            <Component {...props} />
          </Row>
        </Container>
    )} />
  );
};

export default PublicRoute;