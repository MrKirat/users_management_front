import axios from 'axios';
import * as creds from '../authentication/creds';


const instance = axios.create({
  baseURL: 'http://localhost:3000/api/v1/',
});

instance.interceptors.request.use(
  config => {
    const { token, client, uid } = creds.get();

    config.headers = { 'access-token': token, client, uid };
    console.log(config);
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

const getEmployees = (page = 1, perPage = 10, employeeName = '') => {
  const queryParams = `page=${page}&per_page=${perPage}&name=${employeeName}`;
  return instance.get(`/employees?${queryParams}`)
    .then(response => {
      return response;
    })
    .catch(error => {
      return Promise.reject(error);
    });
}

const getEmployee = (id) => {
  return instance.get(`/employees/${id}`)
    .then(response => {
      return response;
    })
    .catch(error => {
      return Promise.reject(error);
    });
}

const updateEmployee = (id, { name, departmentId, active }) => {
  const employee = { name, departmentId, active }

  return instance.put(`/employees/${id}`, { employee })
    .then(response => {
      return response;
    })
    .catch(error => {
      return Promise.reject(error);
    });
}

const deleteEmployee = (id) => {
  return instance.delete(`/employees/${id}`)
    .then(response => {
      return response;
    })
    .catch(error => {
      return Promise.reject(error);
    });
}

export { getEmployee, getEmployees, updateEmployee, deleteEmployee };