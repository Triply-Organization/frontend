import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';

import { tourAPI } from '../api/tourAPI';

const initialState = {
  list: [],
  loading: false,
};

export const getListTours = createAsyncThunk('tours/get-all', async () => {
  const res = await tourAPI.getAll();
  return res;
});

const toursSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getListTours.pending, state => {
      state.loading = true;
    });
    builder.addCase(getListTours.rejected, state => {
      state.loading = false;
      message.error('Can not connect to server. Please check your internet');
    });
    builder.addCase(getListTours.fulfilled, (state, action) => {
      let data = action.payload;
      console.log(data);
    });
  },
});

export default toursSlice;
