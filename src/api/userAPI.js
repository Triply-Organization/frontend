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

  getOrderList() {
    const url = `users`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  addReview(params) {
    console.log(params);
    const url = `reviews/${params.id}`;
    return axiosClient.post(url, params.body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },
};
