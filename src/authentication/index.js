import axios from 'axios';
import * as creds from './creds';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
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

const setOnSuccess = response => {
  console.log(response);
  creds.set(
    response.headers['access-token'],
    response.headers['client'],
    response.headers['uid']
  )
  return response;
}

const removeOnError = error => {
  console.log(error);
  creds.remove();
  return Promise.reject(error);
}

const signUpUser = ({ email, name, active, department_id, password }) => {
  return instance.post('/auth', { email, name, active, department_id, password })
    .then(setOnSuccess)
    .catch(removeOnError);
}

const signInUser = ({ email, password }) => {
  return instance.post('/auth/sign_in', { email, password })
    .then(setOnSuccess)
    .catch(removeOnError);
}

const signOutUser = () => {
  const { token, client, uid } = creds.get();
  const headers = { 'access-token': token, client, uid }

  return instance.delete('/auth/sign_out', { headers })
    .then(response => {
      creds.remove();
      return response;
    })
    .catch(error => {
      console.log(error);
      creds.remove();
      return Promise.reject(error);
    });
}

const verifyToken = () => {
  const { token, client, uid } = creds.get();
  const headers = { 'access-token': token, client, uid }

  return instance.get('/auth/validate_token', { headers })
}

const isAuthenticated = () => {
  const { token, client, uid } = creds.get();

  return Boolean(token && client && uid);
}

export { signUpUser, signInUser, signOutUser, verifyToken, isAuthenticated, setOnSuccess, removeOnError };