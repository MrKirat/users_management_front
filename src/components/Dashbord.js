import React, { useState, useEffect } from 'react';
import { getEmployees } from '../users_management_api/';

const Dashboard = props => {
  const [employees, setEmployees] = useState();
  const [meta, setMeta] = useState();

  useEffect(() => {
    getEmployees()
      .then(resp => {
        setEmployees(resp.data.employees);
        setMeta(resp.meta);
      })
  }, []);

  ;

  console.log(employees);

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
      
    </div>
  );
}

export default Dashboard;
