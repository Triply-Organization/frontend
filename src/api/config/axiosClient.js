import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'https://api.khajackie2206.me/api/',
  headers: {
    'content-type': 'application/json',
  },
});
