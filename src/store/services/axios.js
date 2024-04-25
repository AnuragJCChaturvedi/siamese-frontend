import axios from 'axios';

import config from '../../config';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const axiosInstance = axios.create({
  baseURL: config.SERVER_URL,
  timeout: 10000, // Timeout in milliseconds
  cancelToken: source.token,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Content-Type'] = 'application/json';
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Do something with response error
    if (typeof error === 'undefined') {
      // request cancelled
      // when backend server is not available at all
    } else if (typeof error.response === 'undefined') {
      // when request is timeout
    } else if (error.response.status === 401) {
      // apply refresh token logic here instead of redirecting to login
      localStorage.clear();
      sessionStorage.clear();
      // window.location.reload();
    }
    if (!error.response) {
      console.error(error.message || 'Error in util/axios.js -2');
    }
    return Promise.reject(
      error.response || new Error('Error in util/axios.js - 2')
    );
  }
);

export default axiosInstance;
