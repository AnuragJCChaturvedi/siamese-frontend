import axiosInstance from './axios';

export const login = async ({ email, password }) => {
  return axiosInstance.request({
    method: 'get',
    url: '/user/login',
    params: {
      email,
      password,
    },
  });
};

export const signUp = async ({ name, email, password, role }) => {
  return axiosInstance.request({
    method: 'post',
    url: '/user/register',
    data: {
      name,
      email,
      password,
      role,
    },
  });
};

export const validateToken = async () => {
  return axiosInstance.request({
    method: 'get',
    url: '/user/validate-token',
  });
};
