import axios from 'axios';

const login = params => axios.post(`/user`, params);

const userApi = {
  login,
};

export default userApi;
