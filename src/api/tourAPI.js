import { axiosClient } from './config/axiosClient';

export const tourAPI = {
  getAll() {
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
};
