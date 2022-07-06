import { axiosClient } from './config/axiosClient';

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

  getTours(params) {
    const url = `/tours/all/${params}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  updateTours(id, body) {
    const url = `/tours/changeStatus/${id}`;
    return axiosClient.patch(url, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },
};
