import React, { useState } from 'react';
import { signInUser } from '../authentication/index.js';
import { Redirect } from 'react-router-dom';
const SignInPage = props => {
  const [email, setEmail] = useState('somtest@test.com');
  const [password, setPassword] = useState('123456');
  const [redirect, setRedirect] = useState(false);

  const submitForm = e => {
    e.preventDefault();
    signInUser({ email, password })
      .then(resp => setRedirect(true));
  }

  return (
    redirect ?
      <Redirect to="/dashboard" /> :
      <form onSubmit={e => submitForm(e)}>
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
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            required />
        </div>
        <button type="submit">Sign In</button>
      </form >
  );
}

export default SignInPage;
