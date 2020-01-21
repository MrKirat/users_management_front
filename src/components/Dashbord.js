import React, { useState, useEffect } from 'react';
import { getEmployees, deleteEmployee } from '../users_management_api/';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

const PER_PAGE = 10;

const Dashboard = props => {
  const [employees, setEmployees] = useState();
  const [meta, setMeta] = useState();
  const [searchValue, setSearchValue] = useState('');

  function updateEmployeesList(page = 1) {
    getEmployees(page, PER_PAGE, searchValue)
      .then(resp => {
        setEmployees(resp.data.employees);
        setMeta(resp.data.meta);
      })
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

  const handleDelete = id => {
    deleteEmployee(id)
      .then(updateEmployeesList());
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
                <button onClick={e => handleDelete(employee.id)}>Delete</button></td>
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
