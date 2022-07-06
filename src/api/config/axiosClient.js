import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'https://api.triply.asia/api/',
  headers: {
    'content-type': 'application/json',
  },
});
