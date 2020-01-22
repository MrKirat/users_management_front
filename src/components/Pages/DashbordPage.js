import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';

import { getEmployees, deleteEmployee, deleteCurrentEmployee } from '../../api';
import { isAuthenticated } from '../../authentication';
import CustomPagination from '../Pagination';
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

  const onPageChangeHandler = page => {
    updateEmployeesList(page)
  }

  const searchChangeHandler = event => {
    setSearchValue(event.target.value);
  }

  const searchSubmitHandler = event => {
    event.preventDefault();
    updateEmployeesList(1);
  }

  const handleDelete = employee => {
    if (employee.email === creds.get().uid) {
      deleteCurrentEmployee()
        .finally(resp => {
          creds.remove();
          setIsAuth(false);
        })
    } else {
      deleteEmployee(employee.id)
        .then(resp => {
          let pageNumber = meta?.currentPage;

          if(meta?.totalEntries % PER_PAGE === 1){
            pageNumber = meta?.currentPage - 1;
          }
          if(pageNumber < 1){
            pageNumber = 1;
          }

          console.log(pageNumber);

          updateEmployeesList(pageNumber);
        });
    }
  }

  if (!isAuth) {
    return <Redirect to="/sign-in" />
  }

  return (
    <>
      <Row className="dashboard">
        <Col lg={5}>
          <Form className="mb-4 mt-4" onSubmit={searchSubmitHandler}>
            <div className="d-flex">
              <Form.Control value={searchValue} onChange={searchChangeHandler} type='text' />
              <Button type='submit'>Search</Button>
            </div>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered>
            <thead>
              <tr>
                <td>ID</td>
                <td>NAME</td>
                <td>EMAIL</td>
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
                  <td>{employee.email}</td>
                  <td>{String(employee.active)}</td>
                  <td>{employee.department.name}</td>
                  <td>
                    <Button variant="primary" className="mr-2" as={Link} to={`/user/${employee.id}`} >Edit</Button>
                    <Button variant="danger" onClick={e => handleDelete(employee)}>Delete</Button></td>
                </tr>
              )}
            </tbody>
          </Table>
          <CustomPagination
            currentPage={meta?.currentPage}
            totalPages={meta?.totalPages}
            onPageChange={onPageChangeHandler} />
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
