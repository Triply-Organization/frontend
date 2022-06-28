import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'https://6299c4f26f8c03a97849254c.mockapi.io/',
  headers: {
    'content-type': 'application/json',
  },
});
