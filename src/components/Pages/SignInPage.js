import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import { signInUser } from '../../authentication/index.js';

const SignInPage = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submitForm = e => {
    e.preventDefault();
    signInUser({ email, password })
      .then(resp => setRedirect(true));
  }

  return (
    redirect ?
      <Redirect to="/dashboard" /> :
      <Form onSubmit={e => submitForm(e)}>
        <Form.Group controlId="formSignInEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            required />
        </Form.Group>
        <Form.Group controlId="formSignInPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            required />
        </Form.Group>
        <Button type="submit">Sign In</Button>
      </Form >
  );
}

export default SignInPage;
