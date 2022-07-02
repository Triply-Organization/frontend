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
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.loading = true;
    });
    builder.addCase(login.rejected, state => {
      state.loading = false;
      message.error({ content: 'Invalid email or password', key: 'failed' });
    });
    builder.addCase(login.fulfilled, (state, action) => {
      let data = action.payload;
      console.log(data);
      state.loading = false;
      if (data.status >= 200 && data.status < 300) {
        localStorage.setItem('token', data.data.data.token);
        state.user = data.data.data.data;
        message.success({ content: 'Login successfully!', key: 'success' });
      }
    });
  },
});

export default loginSlice;

export const { addNewUser } = loginSlice.actions;
