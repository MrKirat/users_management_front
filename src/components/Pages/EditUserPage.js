import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import { getEmployee, updateEmployee } from '../../api';

const EditUser = props => {
  const [user, setUser] = useState();
  const [back, setBack] = useState();

  useEffect(() => {
    getEmployee(props.match.params.id)
      .then(resp => {
        setUser(resp.data.employee);
        setBack(false);
      })
      .catch(err => {
        setBack(true);
      })
  }, []);

  const handleBack = event => {
    event.preventDefault();
    setBack(true);
  }

  if (back) {
    return <Redirect to='/dashboard' />
  }

  const setName = name => {
    setUser({...user, name});
  }

  const setActive = active => {
    setUser({...user, active});
  }

  const submitForm = event => {
    event.preventDefault();
    updateEmployee(user.id, user);
  }

  return (
    <Form onSubmit={e => submitForm(e)}>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <input
          type="text"
          name="name"
          onChange={e => setName(e.target.value)}
          value={user?.name}
          required />
      </Form.Group>
      <Form.Group>
        <Form.Check
          type="checkbox"
          name="active"
          label="Active"
          onChange={e => setActive(e.target.value)}
          defaultChecked={user?.active}
          required />
      </Form.Group>
      <Button variant="primary" onClick={handleBack}>Back</Button>
      <Button className="ml-2" variant="success" type="submit">Save</Button>
    </Form>
  );
}

export default EditUser;
