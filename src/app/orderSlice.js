import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { orderAPI } from '../api/orderAPI';

const initialState = {
  loading: false,
};

export const orderTour = createAsyncThunk('order/orderTour', async params => {
  const res = await orderAPI.order(params);
  return res;
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(orderTour.pending, state => {
      state.loading = true;
    });
    builder.addCase(orderTour.rejected, state => {
      state.loading = false;
    });
    builder.addCase(orderTour.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
    });
  },
});

export default orderSlice;
