import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import { getDepartments } from '../../api';
import { signUpUser } from '../../authentication/index.js';

const RegisterPage = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [active, setActive] = useState(true);
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [employeeDepartment, setEmployeeDepartment] = useState('');
  const [departmentsList, setDepartmentsList] = useState([]);

  useEffect(() => {
    getDepartments()
      .then(resp => {
        setDepartmentsList(resp.data.departments);
        setEmployeeDepartment(`${resp.data.departments[0].id}`);
      });
  }, [])

  const submitForm = e => {
    e.preventDefault();
    signUpUser({ email, name, active, department_id: employeeDepartment, password })
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
        <Form.Group controlId="formSignUpDepartment">
          <Form.Label>Select department</Form.Label>
          <Form.Control value={employeeDepartment} onChange={e => setEmployeeDepartment(e.target.value)} as="select">
            {departmentsList.map(d =>
              <option value={d.id} key={d.id}>{d.name}</option>
            )}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formSignUpActive">
          <Form.Check
            type="checkbox"
            name="active"
            label="Active"
            onClick={e => setActive(e.target.checked)}
            checked={active} />
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
