import { axiosClient } from './config/axiosClient';

export const checkoutAPI = {
  checkout(params) {
    const url = `checkout`;
    return axiosClient.post(url, params);
  },

  getVoucherInfo(params) {
    const url = `vouchers/getinfo`;
    return axiosClient.post(url, params);
  },

  getConfirmInfo(params) {
    const url = `orders/${decodeURIComponent(params)}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },
};
