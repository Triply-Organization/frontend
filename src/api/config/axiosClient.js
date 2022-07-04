import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'https://api.nhivo-rentcar.me/api/',
  headers: {
    'content-type': 'application/json',
  },
});
