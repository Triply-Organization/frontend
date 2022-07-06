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

  getAllOrder() {
    const url = `/users`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },
};
