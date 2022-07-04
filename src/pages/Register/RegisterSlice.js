import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';

import { userAPI } from '../../api/userApi';

export const register = createAsyncThunk('user/register', async params => {
  const res = await userAPI.register(params);
  return res;
});

const initialState = {
  loading: false,
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(register.pending, state => {
      state.loading = true;
    });
    builder.addCase(register.rejected, state => {
      state.loading = false;
      message.error('Email has already used!');
    });
    builder.addCase(register.fulfilled, state => {
      state.loading = false;
      message.success('Register successfull!');
    });
  },
});

export default registerSlice;
