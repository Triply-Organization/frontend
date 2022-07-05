import axios from 'axios';

export const fakeTourAxios = axios.create({
  baseURL: 'https://62c3f6ffabea8c085a6795ea.mockapi.io/',
  headers: {
    'content-type': 'application/json',
  },
});
