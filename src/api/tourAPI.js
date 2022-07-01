import { axiosClient } from './config/axiosClient';

export const tourAPI = {
  getDestinationsServiceTours() {
    const url = `/tours`;
    return axiosClient.get(url);
  },
  getToursByFilter(params) {
    const url = `/tours?destination=${params.destinations}`;
    return axiosClient.get(url);
  },
};
