import { axiosClient } from './config/axiosClient';

export const userAPI = {
  login(params) {
    const url = `/login`;
    return axiosClient.post(url, params);
  },

  register(params) {
    const url = `/register`;
    return axiosClient.post(url, params);
  },
};