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

export const getVoucherInfo = createAsyncThunk(
  'checkout/getVoucherInfo',
  async params => {
    const res = await checkoutAPI.getVoucherInfo(params);
    return res;
  },
);

export const getConfirmInfo = createAsyncThunk(
  'checkout/getConfirmInfo',
  async params => {
    const res = await checkoutAPI.getConfirmInfo(params);
    return res;
  },
);

const initialState = {
  loading: false,
  data: {},
  voucher: {},
  confirmationData: {},
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
      window.open(action.payload.data.data[0].checkoutURL);
      message.success({ content: 'Check out successfull!', key: 'success' });
    });

    builder.addCase(getVoucherInfo.pending, state => {
      state.loading = true;
    });
    builder.addCase(getVoucherInfo.rejected, state => {
      state.loading = false;
      message.error = { content: 'Voucher Code is invalid', key: 'failed' };
    });
    builder.addCase(getVoucherInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.voucher = action.payload.data.data;
      message.success({ content: 'Voucher Code is valid', key: 'success' });
    });

    builder.addCase(getConfirmInfo.pending, state => {
      state.loading = true;
    });
    builder.addCase(getConfirmInfo.rejected, state => {
      state.loading = false;
    });
    builder.addCase(getConfirmInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.confirmationData = action.payload.data.data;
    });
  },
});

export default checkoutSlice;
