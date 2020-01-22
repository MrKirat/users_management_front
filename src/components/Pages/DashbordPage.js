import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Table, Form, Button, Pagination } from 'react-bootstrap';

import { getEmployees, deleteEmployee, deleteCurrentEmployee } from '../../api';
import { isAuthenticated } from '../../authentication';
import * as creds from '../../authentication/creds';

const PER_PAGE = 10;

const Dashboard = props => {
  const [employees, setEmployees] = useState();
  const [meta, setMeta] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [isAuth, setIsAuth] = useState(isAuthenticated());

  function updateEmployeesList(page) {
    return getEmployees(page, PER_PAGE, searchValue)
      .then(resp => {
        setMeta(resp.data.meta);
        setEmployees(resp.data.employees);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  useEffect(() => {
    updateEmployeesList(1);
  }, []);

  const onPageChangeHandler = event => {
    console.log(event.target)
    updateEmployeesList(event.target.text)
  }

  const searchChangeHandler = event => {
    setSearchValue(event.target.value);
  }

  const searchSubmitHandler = event => {
    event.preventDefault();
    updateEmployeesList(1);
  }

  const handleDelete = employee => {
    if (employee.email == creds.get().uid) {
      deleteCurrentEmployee()
        .finally(resp => {
          creds.remove();
          setIsAuth(false);
        })
    } else {
      deleteEmployee(employee.id)
        .then(resp => {
          updateEmployeesList(1);
        });
    }
  }

  if (!isAuth) {
    return <Redirect to="/sign-in" />
  }

  let active = meta?.currentPage;
  let items = [<Pagination.First />, <Pagination.Prev />];
  for (let number = 1; number <= meta?.totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }
  items.push([<Pagination.Next />, <Pagination.Last />]);

  return (
    <div className="dashboard">
      <Form className="mb-4" onSubmit={searchSubmitHandler}>
        <div className="d-flex">
          <Form.Control value={searchValue} onChange={searchChangeHandler} type='text' />
          <Button type='submit'>Search</Button>
        </div>
      </Form>
      <Table striped bordered>
        <thead>
          <tr>
            <td>ID</td>
            <td>NAME</td>
            <td>ACTIVE</td>
            <td>DEPARTMENT</td>
            <td>ACTIONS</td>
          </tr>
        </thead>
        <tbody>
          {employees?.map(employee =>
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{String(employee.active)}</td>
              <td>{employee.department.name}</td>
              <td>
                <Button variant="primary" className="mr-2" as={Link} to={`/user/${employee.id}`} >Edit</Button>
                <Button variant="danger" onClick={e => handleDelete(employee)}>Delete</Button></td>
            </tr>
          )}
        </tbody>
      </Table>
      <Pagination onClick={onPageChangeHandler}>{items}</Pagination>
    </div>
  );
}

export default Dashboard;
