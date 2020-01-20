import React from 'react';
import { Route, Redirect, NavLink } from 'react-router-dom';
import { isAuthenticated } from '../authentication';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {

  return (
    <Route {...rest} render={props => (
      isAuthenticated() && restricted ?
        <Redirect to="/dashboard" /> :
        <>
          <header>
            <NavLink to="sign-in">Sign in</NavLink>
            <NavLink to="sign-up">Sign up</NavLink>
          </header>
          <Component {...props} />
        </>
    )} />
  );
};

export default PublicRoute;