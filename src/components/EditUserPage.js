import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { getEmployee, updateEmployee } from '../users_management_api';

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
    <form onSubmit={e => submitForm(e)}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          onChange={e => setName(e.target.value)}
          value={user?.name}
          required />
      </div>
      <div>
        <label>Active</label>
        <input
          type="checkbox"
          name="active"
          onChange={e => setActive(e.target.value)}
          defaultChecked={user?.active}
          required />
      </div>
      <button type="submit">Save</button>
      <button onClick={handleBack}>Back</button>
    </form>
  );
}

export default EditUser;
