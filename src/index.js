import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Dashboard from './components/Pages/DashbordPage';
import SignUpPage from './components/Pages/SignUpPage';
import SignInPage from './components/Pages/SignInPage';
import EditUser from './components/Pages/EditUserPage';

import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import PrivateRoute from './components/Routing/PrivateRoute';
import PublicRoute from './components/Routing/PublicRoute';

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
