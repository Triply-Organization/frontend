import { axiosClient } from './config/axiosClient';
import { fakeTourAxios } from './config/fakeToursAxios';

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
    const url = `statistical/`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  getTours() {
    const url = `tours`;
    return fakeTourAxios.get(url);
  },
};
