import axios from 'axios';
import * as creds from '../authentication/creds';

const { token, client, uid } = creds.get();
const instance = axios.create({
  baseURL: 'http://localhost:3000/api/v1/',
  headers: { 'access-token': token, client, uid }
});

instance.interceptors.request.use(
  config => {
    console.log(config)
    return config;
  },
  error => {
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

export { getEmployees };