import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/';

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {

  // Do something with response error
  return Promise.reject(error);
});
