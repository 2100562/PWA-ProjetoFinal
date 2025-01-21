import axios from 'axios';

module.exports = async function () {
  // Configure axios for tests to use.
  const host = process.env.HOST ?? 'localhost';
  const port = process.env.PORT ?? '3000';
  axios.defaults.baseURL = `http://${host}:${port}/api`;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.post['Accept'] = 'application/json';
  axios.defaults.headers.get['Content-Type'] = 'application/json';
  axios.defaults.headers.get['Accept'] = 'application/json';
  axios.defaults.headers.post['Authorization'] =
    `Bearer ${globalThis.__LECTURER_TOKEN__}`;
  axios.defaults.headers.get['Authorization'] =
    `Bearer ${globalThis.__LECTURER_TOKEN__}`;
};
