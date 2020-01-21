import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Dashboard from './components/Dashbord';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import EditUser from './components/EditUserPage';

import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    <Switch>
      <PublicRoute restricted={true} component={SignUpPage} path="/sign-up" />
      <PublicRoute restricted={true} component={SignInPage} path="/sign-in" />
      <PrivateRoute component={EditUser} path="/user/:id" />
      <PrivateRoute component={Dashboard} path="/dashboard" />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
