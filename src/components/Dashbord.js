import React, { useState, useEffect } from 'react';
import { getEmployees } from '../users_management_api/';
import ReactPaginate from 'react-paginate';

const Dashboard = props => {
  const [employees, setEmployees] = useState();
  const [meta, setMeta] = useState();

  useEffect(() => {
    getEmployees()
      .then(resp => {
        setEmployees(resp.data.employees);
        setMeta(resp.data.meta);
        console.log(resp);
      })
  }, []);

  const onPageChangeHandler = page => {
    getEmployees(page.selected + 1)
      .then(resp => {
        setEmployees(resp.data.employees);
        setMeta(resp.data.meta);
      })
  }

  return (
    <div className="dashboard">
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>NAME</td>
            <td>ACTIVE</td>
            <td>DEPARTMENT</td>
          </tr>
        </thead>
        <tbody>
          {employees?.map(employee =>
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{String(employee.active)}</td>
              <td>{employee.department.name}</td>
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
