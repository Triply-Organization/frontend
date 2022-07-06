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

  getAllUsers(params) {
    const url = `/admin/manager/users${params}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  changeRoleUser(id, body) {
    const url = `/admin/manager/users/${id}`;
    return axiosClient.patch(url, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  deleteUser(params) {
    const url = `/admin/manager/users/${params}`;
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  getAllCustomers(params) {
    const url = `/admin/manager/customers${params}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  deleteCustomer(params) {
    const url = `/admin/manager/customers/${params}`;
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },
};
