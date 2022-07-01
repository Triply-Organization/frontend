import { axiosClient } from './config/axiosClient';

export const tourAPI = {
  getAll() {
    const url = `/tours`;
    return axiosClient.get(url);
  },
};
