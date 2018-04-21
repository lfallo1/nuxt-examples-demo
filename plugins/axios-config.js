import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/';

axios.interceptors.request.use((config) => {

  //on all requests, set the Bearer token if it exists and it is not the refresh token request
  if (config.url.indexOf('grant_type=refresh_token&refresh_token=') < 0 && window.$nuxt.$store.getters.accessToken) {
    config.headers['Authorization'] = window.$nuxt.$store.getters.accessToken;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {

  if (error.response.status == 401) {

    //if a bad credentials response, then try the refresh token
    //*** unless this is the response to the refresh token request, in which case we don't want to try the refresh token again
    if (error.response.data.error_description.indexOf('expired') > -1 && error.config.url.indexOf('grant_type=refresh_token&refresh_token=') < 0) {
      return window.$nuxt.$store.dispatch('refreshToken')
        .then(() => {
          return axios.request(error.config)
            .then((response) => {
              return Promise.resolve(response);
            })
            .catch(err => {
              return Promise.reject(err);
            })
        })
        .catch(error => {
          return Promise.reject();
        });
    } else {

      //if received a 401
      window.$nuxt.$store.dispatch('clearAuth')
      return Promise.reject();
    }
  }

  return Promise.reject(error);
});
