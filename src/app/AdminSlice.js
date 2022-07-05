import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';

import { adminAPI } from '../api/adminAPI';

export const getTotalBooking = createAsyncThunk(
  'admin/total-booking',
  async year => {
    const res = await adminAPI.getBooking(year);
    console.log(res.data);
    return res.data;
  },
);

export const getTotalCommission = createAsyncThunk(
  'admin/total-commission',
  async year => {
    const res = await adminAPI.getCommission(year);
    return res.data;
  },
);

export const getOverall = createAsyncThunk('admin/overall', async () => {
  const res = await adminAPI.getOverall();
  return res.data;
});

export const getTours = createAsyncThunk('admin/tours', async () => {
  const res = await adminAPI.getTours();
  return res.data[0];
});

let initialState = {
  totalBookingData: [],
  totalCommissionData: [],
  overall: [],
  tours: [],
  loading: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // GET TOTAL BOOKING PER MONTH
    builder.addCase(getTotalBooking.pending, state => {
      state.loading = true;
    });
    builder.addCase(getTotalBooking.rejected, state => {
      state.loading = false;
      message.error(
        'Something went wrong! Could not get total booking per month',
      );
    });
    builder.addCase(getTotalBooking.fulfilled, (state, action) => {
      state.loading = false;
      const data = action.payload;
      if (data.status === 'success') {
        const responseData = data.data;
        const columnData = [];
        for (const [key, value] of Object.entries(responseData)) {
          columnData.push({ month: key, booking: value });
        }
        state.totalBookingData = columnData;
      }
    });
    // GET TOTAL COMMISSION PER MONTH
    builder.addCase(getTotalCommission.pending, state => {
      state.loading = true;
    });
    builder.addCase(getTotalCommission.rejected, state => {
      state.loading = false;
      message.error(
        'Something went wrong! Could not get total commission per month',
      );
    });
    builder.addCase(getTotalCommission.fulfilled, (state, action) => {
      state.loading = false;
      const data = action.payload;
      if (data.status === 'success') {
        const responseData = data.data;
        const lineData = [];
        console.log(responseData);
        for (const [key, val] of Object.entries(responseData)) {
          for (const [key1, val1] of Object.entries(val)) {
            lineData.push({ month: key, value: val1, type: key1 });
          }
        }
        // console.log(lineData);
        state.totalCommissionData = lineData;
      }
    });
    // GET OVERALL
    builder.addCase(getOverall.pending, state => {
      state.loading = true;
    });
    builder.addCase(getOverall.rejected, state => {
      state.loading = false;
      message.error('Something went wrong! Could not get overall information');
    });
    builder.addCase(getOverall.fulfilled, (state, action) => {
      state.loading = false;
      const data = action.payload;
      if (data.status === 'success') {
        state.overall = { ...data.data.overall };
      }
    });

    // GET TOURS
    builder.addCase(getTours.pending, state => {
      state.loading = true;
    });
    builder.addCase(getTours.rejected, state => {
      state.loading = false;
      message.error('Something went wrong! Could not get overall information');
    });
    builder.addCase(getTours.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
    });
  },
});

export default adminSlice;
