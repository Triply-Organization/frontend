import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';

import { userAPI } from '../../api/userApi';

export const login = createAsyncThunk('user/login', async params => {
  const res = await userAPI.login(params);
  return res;
});

const initialState = {
  user: {},
  loading: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    addNewUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: state => {
      state.user = {};
    },
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.loading = true;
    });
    builder.addCase(login.rejected, state => {
      state.loading = false;
      message.error('Invalid email or password');
    });
    builder.addCase(login.fulfilled, (state, action) => {
      let data = action.payload;
      state.loading = false;
      if (data.status >= 200 && data.status < 300) {
        localStorage.setItem('token', data.data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.data.data));
        state.user = data.data.data.data;
        message.success('Login successfully!');
      }
    });
  },
});

export default loginSlice;

export const { addNewUser } = loginSlice.actions;
