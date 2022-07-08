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

  refundOrder(params) {
    const url = `/refund/`;
    return axiosClient.post(url, params, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  editUser(params) {
    const url = `/users/${params.id}`;
    return axiosClient.patch(url, params.body, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  },
};
