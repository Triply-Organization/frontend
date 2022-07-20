import { axiosClient } from './config/axiosClient';

export const tourAPI = {
  getDestinationsServiceTours() {
    const url = `tours`;
    return axiosClient.get(url);
  },

  getTourById(id) {
    const url = `tours/${id}`;
    return axiosClient.get(url);
  },

  createTour(params) {
    const url = `tours`;
    return axiosClient.post(url, params, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  },

  bookTour(params) {
    const url = `booking`;
    return axiosClient.post(url, params);
  },
  getToursByFilter(params) {
    const url = `tours/${decodeURIComponent(params)}`;
    return axiosClient.get(url);
  },

  addSchedule(params, id) {
    const url = `schedules/${id}`;
    return axiosClient.post(url, params, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  },

  getToursOfCustomer() {
    const url = `tours/customerTour`;
    return axiosClient.get(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  },
  getScheduleOfTour(id) {
    const url = `schedules/${id}`;
    return axiosClient.get(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  },

  deleteTour(id) {
    const url = `tours/${id}`;
    return axiosClient.delete(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  },

  updateTour(params) {
    const url = `tours/${params.id}`;
    return axiosClient.patch(url, params.body, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  },

  getPopularTours() {
    const url = `tours`;
    return axiosClient.get(url);
  },
};
