import { axiosClient } from './config/axiosClient';

export const orderAPI = {
  order(params) {
    const url = `/orders/`;
    return axiosClient.post(url, params, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },
};
