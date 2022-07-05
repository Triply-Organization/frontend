import axios from 'axios';

export const fakeAxios = axios.create({
  baseURL: 'https://62c2e983876c4700f5320a1f.mockapi.io/',
  headers: {
    'content-type': 'application/json',
  },
});
