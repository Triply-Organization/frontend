import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { user } from '../../api';

const login = createAsyncThunk('user/login', async params => {
  const res = await user.loginApi(params);
  return res.data;
});

const initialState = {
  user: {},
  loading: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.loading = true;
    });
    builder.addCase(login.rejected, state => {
      state.loading = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
  },
});

export default loginSlice;
