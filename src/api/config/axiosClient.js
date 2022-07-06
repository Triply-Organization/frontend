/* eslint-disable no-undef */
import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
});
