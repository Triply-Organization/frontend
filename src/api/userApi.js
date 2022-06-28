import { axiosClient } from './config/axiosClient';

export const userAPI = {
  getUserInfo() {
    const url = `/users/`;
    return axiosClient.get(url);
  },

  login(params) {
    const url = `/users/${params}`;
    return axiosClient.post(url);
  },

  register(params) {
    const url = `/users/${params}`;
    return axiosClient.post(url);
  },
};
