import React, { useState } from 'react';
import { Route, Redirect, NavLink } from 'react-router-dom';
import { Container, Navbar, Nav, Row } from 'react-bootstrap';

import { isAuthenticated, signOutUser } from '../../authentication';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [redirect, setRedirect] = useState(false);

  const signOutHandler = e => {
    e.preventDefault();
    signOutUser()
      .finally(() => setRedirect(true));
  }

  if (!isAuthenticated() || redirect) {
    return <Redirect to="/sign-in" />
  }

  return (
    <Route {...rest} render={props => (
      <Container>
        <Row>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand>Users Management</Navbar.Brand>
            <Nav.Link as={NavLink} to="/sign-in" onClick={signOutHandler}>Sign out</Nav.Link>
          </Navbar>
        </Row>
        <Row>
          <Component {...props} />
        </Row>
      </Container>
    )} />
  );
};

export default PrivateRoute;