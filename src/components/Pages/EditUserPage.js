import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import { getEmployee, updateEmployee, getDepartments } from '../../api';

const EditUser = props => {
  const [user, setUser] = useState();
  const [back, setBack] = useState();
  const [departmentsList, setDepartmentsList] = useState([]);

  useEffect(() => {
    getEmployee(props.match.params.id)
      .then(resp => {
        setUser(resp.data.employee);
        setBack(false);
      })
      .catch(err => {
        setBack(true);
      })
    getDepartments()
      .then(resp => {
        setDepartmentsList(resp.data.departments);
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
    setUser({ ...user, name });
  }

  const setActive = active => {
    setUser({ ...user, active });
  }

  const setDepartment = departmentId => {
    setUser({ ...user, department: { id: departmentId } });
  }

  console.log(user);

  const submitForm = event => {
    event.preventDefault();
    const { name, department: { id: departmentId }, active } = user
    updateEmployee(user.id, { name, departmentId, active });
  }

  return (
    <Form onSubmit={e => submitForm(e)}>
      <Form.Group controlId="formEditName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          onChange={e => setName(e.target.value)}
          value={user?.name}
          required />
      </Form.Group>
      <Form.Group controlId="formEditDepartment">
        <Form.Label>Select department</Form.Label>
        <Form.Control value={user?.department?.id} onChange={e => setDepartment(e.target.value)} as="select">
          {departmentsList.map(d =>
            <option value={d.id} key={d.id}>{d.name}</option>
          )}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formEditActive">
        <Form.Check
          type="checkbox"
          name="active"
          label="Active"
          onClick={e => setActive(e.target.checked)}
          checked={user?.active} />
      </Form.Group>
      <Button variant="primary" onClick={handleBack}>Back</Button>
      <Button className="ml-2" variant="success" type="submit">Save</Button>
    </Form>
  );
}

export default EditUser;
