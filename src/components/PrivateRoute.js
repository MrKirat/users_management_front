import React, { useState } from 'react';
import { Route, Redirect, NavLink } from 'react-router-dom';
import { isAuthenticated, signOutUser } from '../authentication';

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
      <>
        <header>
          <NavLink to="/sign-in" onClick={signOutHandler}>Sign out</NavLink>
        </header>
        <Component {...props} />
      </>
    )} />
  );
};

export default PrivateRoute;