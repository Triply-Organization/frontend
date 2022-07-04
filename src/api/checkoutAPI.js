import { axiosClient } from './config/axiosClient';

export const checkoutAPI = {
  checkout(params) {
    const url = `/checkout/`;
    return axiosClient.post(url, params);
  },
};
