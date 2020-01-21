import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import { signUpUser } from '../../authentication/index.js';

const RegisterPage = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [active, setActive] = useState(true);
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submitForm = e => {
    e.preventDefault();
    signUpUser({ email, name, active, department_id: 1, password })
      .then(() => setRedirect(true));
  }

  return (
    redirect ?
      <Redirect to="/dashboard" /> :
      <Form onSubmit={e => submitForm(e)}>
        <Form.Group controlId="formSignUpName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter name"
            onChange={e => setName(e.target.value)}
            value={name}
            required />
        </Form.Group>
        <Form.Group controlId="formSignUpEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            required />
        </Form.Group>
        <Form.Group controlId="formSignUpActive">
          <Form.Check
            type="checkbox"
            name="active"
            label="Active"
            onChange={e => setActive(e.target.value)}
            defaultChecked={active}
            required />
        </Form.Group>
        <Form.Group controlId="formSignUpPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            required />
        </Form.Group>
        <Button type="submit">Sign Up</Button>
      </Form>
  );
}

export default RegisterPage;
