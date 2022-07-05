import { axiosClient } from './config/axiosClient';
import { fakeAxios } from './config/fakeAxios';

export const adminAPI = {
  getBooking(year) {
    const url = `statistical/booking/${year}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  getCommission(year) {
    const url = `statistical/totalRevenue/${year}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  getOverall() {
    const url = `booking`;
    return fakeAxios.get(url);
  },
};
