import axiosInstance from './axios';

export const fetchAllDataSet = async () => {
  // include pagination later when data size grows
  return axiosInstance.request({
    method: 'get',
    url: '/dataset/all',
  });
};
