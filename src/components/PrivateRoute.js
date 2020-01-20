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

  return (
    <Route {...rest} render={props => (
      isAuthenticated() || !redirect ?
        <>
          <header>
            <NavLink to="/sign-in" onClick={signOutHandler}>Sign out</NavLink>
          </header>
          <Component {...props} />
        </> :
        <Redirect to="/sign-in" />
    )} />
  );
};

export default PrivateRoute;