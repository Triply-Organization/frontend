import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';

import { userAPI } from '../api/userAPI';

export const register = createAsyncThunk('user/register', async params => {
  const res = await userAPI.register(params);
  return res;
});

const initialState = {
  loading: false,
  isSuccess: false,
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    clearSuccess: state => {
      state.isSuccess = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(register.pending, state => {
      state.loading = true;
      state.isSuccess = false;
    });
    builder.addCase(register.rejected, state => {
      state.loading = false;
      state.isSuccess = false;
      message.error({ content: 'Email has already used!', key: 'failed' });
    });
    builder.addCase(register.fulfilled, state => {
      state.loading = false;
      state.isSuccess = true;
      message.success({
        content: 'Register successfully! You will be navigated to login',
        key: 'success',
      });
    });
  },
});

export const { clearSuccess } = registerSlice.actions;

export default registerSlice;
