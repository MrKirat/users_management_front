import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Link, Redirect } from 'react-router-dom';
import { Table, Form, Button } from 'react-bootstrap';

import { getEmployees, deleteEmployee, deleteCurrentEmployee } from '../../users_management_api';
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

  const onPageChangeHandler = page => {
    updateEmployeesList(page.selected + 1)
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
      <ReactPaginate
        // labels
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={<a className="page-link">...</a>}
        // classes
        breakClassName={'page-item'}
        pageClassName="page-item"
        previousClassName="page-item"
        nextClassName="page-item"
        pageLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        // configs
        pageCount={meta?.totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        forcePage={meta?.currentPage}
        onPageChange={onPageChangeHandler}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}

export default Dashboard;
