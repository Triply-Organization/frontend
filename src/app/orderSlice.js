import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';

import { orderAPI } from '../api/orderAPI';

const initialState = {
  loading: false,
  checkout: {},
  status: {},
};

export const booking = createAsyncThunk('order/booking', async params => {
  const res = await orderAPI.order(params);
  return res;
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(booking.pending, state => {
      state.loading = true;
    });
    builder.addCase(booking.rejected, state => {
      state.loading = false;
      message.error('Book Tour Failed !');
    });
    builder.addCase(booking.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.checkout = action.payload.data.data;
      state.status = action.payload.data;
    });
  },
});

export default orderSlice;
