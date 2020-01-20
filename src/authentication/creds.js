import cookie from 'react-cookies';

const remove = () => {
  cookie.remove('access-token');
  cookie.remove('client');
  cookie.remove('uid');
}

const set = (token, client, uid) => {
  cookie.save('access-token', token);
  cookie.save('client', client);
  cookie.save('uid', uid);
}

const get = (token, client, uid) => {
  token = cookie.load('access-token');
  client = cookie.load('client');
  uid = cookie.load('uid');
  return { token, client, uid }
}

export { set, get, remove };