import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'http://34.230.29.19/api/',
  headers: {
    'content-type': 'application/json',
  },
});
