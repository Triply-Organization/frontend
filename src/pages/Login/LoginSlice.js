import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { userAPI } from '../../api/userApi';

const login = createAsyncThunk('user/login', async params => {
  const res = await userAPI.login(params);
  return res.data;
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
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
  },
});

export default loginSlice;

export const { addNewUser } = loginSlice.actions;
