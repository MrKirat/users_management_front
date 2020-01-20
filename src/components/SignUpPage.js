import React, { useState } from 'react';
import { signUpUser } from '../authentication/index.js';
import { Redirect } from 'react-router-dom';

const RegisterPage = props => {
  const [name, setName] = useState('test name');
  const [email, setEmail] = useState('somtest@test.com');
  const [active, setActive] = useState(true);
  const [password, setPassword] = useState('123456');
  const [redirect, setRedirect] = useState(false);

  const submitForm = e => {
    e.preventDefault();
    signUpUser({ email, name, active, department_id: 1, password })
      .then(() => setRedirect(true));
  }

  return (
    redirect ?
      <Redirect to="/dashboard" /> :
      <form onSubmit={e => submitForm(e)}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            onChange={e => setName(e.target.value)}
            value={name}
            required />
        </div>
        <div>
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            required />
        </div>
        <div>
          <label>Active</label>
          <input
            type="checkbox"
            name="active"
            onChange={e => setActive(e.target.value)}
            defaultChecked={active}
            required />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
  );
}

export default RegisterPage;
