import { axiosClient } from './config/axiosClient';

export const tourAPI = {
  getDestinationsServiceTours() {
    const url = `/tours`;
    return axiosClient.get(url);
  },

  getTourById(id) {
    const url = `/tours/${id}`;
    return axiosClient.get(url);
  },

  bookTour(params) {
    const url = `/booking`;
    return axiosClient.post(url, params);
  },
  getToursByFilter(params) {
    const url = `/tours${decodeURIComponent(params)}`;
    return axiosClient.get(url);
  },
};
