import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';

import { checkoutAPI } from '../api/checkoutAPI';

export const checkout = createAsyncThunk(
  'checkout/checkoutAPI',
  async params => {
    const res = await checkoutAPI.checkout(params);
    return res;
  },
);

const initialState = {
  loading: false,
  data: {},
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(checkout.pending, state => {
      state.loading = true;
    });

    builder.addCase(checkout.rejected, state => {
      state.loading = false;
      message.error({
        content: 'Check out failed. Please try again later!',
        key: 'failed',
      });
    });

    builder.addCase(checkout.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data.data[0].checkoutURL;
      // console.log(action.payload.data.data[0].checkoutURL);
      window.open(action.payload.data.data[0].checkoutURL);
      message.success({ content: 'Check out successfull!', key: 'success' });
    });
  },
});

export default checkoutSlice;
