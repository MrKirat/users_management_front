import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Link, Redirect } from 'react-router-dom';

import { getEmployees, deleteEmployee, deleteCurrentEmployee } from '../users_management_api/';
import { isAuthenticated } from '../authentication';
import * as creds from '../authentication/creds';

const PER_PAGE = 10;

const Dashboard = props => {
  const [employees, setEmployees] = useState();
  const [meta, setMeta] = useState();
  const [searchValue, setSearchValue] = useState('');
  const [isAuth, setIsAuth] = useState(isAuthenticated());

  function updateEmployeesList(page = 1) {
    return getEmployees(page, PER_PAGE, searchValue)
      .then(resp => {
        setEmployees(resp.data.employees);
        setMeta(resp.data.meta);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  useEffect(() => {
    updateEmployeesList();
  }, []);

  const onPageChangeHandler = page => {
    updateEmployeesList(page.selected + 1)
  }

  const searchChangeHandler = event => {
    setSearchValue(event.target.value);
  }

  const searchSubmitHandler = event => {
    event.preventDefault();
    updateEmployeesList();
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
          updateEmployeesList();
        });
    }
  }

  if (!isAuth) {
    return <Redirect to="/sign-in" />
  }

  return (
    <div className="dashboard">
      <form onSubmit={searchSubmitHandler}>
        <input value={searchValue} onChange={searchChangeHandler} type='text' />
        <button type='submit'>Search</button>
      </form>
      <table>
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
                <Link to={`/user/${employee.id}`} >Edit</Link>
                |
                <button onClick={e => handleDelete(employee)}>Delete</button></td>
            </tr>
          )}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={meta?.totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        initialSelected={meta?.currentPage}
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
