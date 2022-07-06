import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import moment from 'moment';

import { adminAPI } from '../api/adminAPI';

export const getTotalBooking = createAsyncThunk(
  'admin/total-booking',
  async year => {
    const res = await adminAPI.getBooking(year);
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

export const getTours = createAsyncThunk('admin/tours', async params => {
  const res = await adminAPI.getTours(params);
  return res.data;
});

export const getAllUsers = createAsyncThunk('admin/get-all-users', async () => {
  const res = await adminAPI.getAllUsers();
  return res.data;
});

export const getAllCustomers = createAsyncThunk(
  'admin/get-all-customers',
  async () => {
    const res = await adminAPI.getAllCustomers();
    return res.data;
  },
);

export const updateTourStatus = createAsyncThunk(
  'admin/update-tour-status',
  async params => {
    const res = await adminAPI.updateTours(params.id, params.request);
    return res.data;
  },
);

let initialState = {
  totalBookingData: [],
  totalCommissionData: [],
  overall: [],
  toursData: {},
  usersData: {},
  customersData: {},
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
      message.error('Something went wrong! Could not get tours');
    });
    builder.addCase(getTours.fulfilled, (state, action) => {
      state.loading = false;
      const data = action.payload;
      if (data.status === 'success') {
        const toursArray = [];
        data.data.tours?.map(item => {
          toursArray.push({
            key: item.id,
            id: item.id,
            title: item.title,
            customer: item.createdUser,
            duration: item.duration,
            maxPeople: item.maxPeople,
            minAge: item.minAge,
            createdAt: moment(item.date).format('DD/MM/YYYY'),
            status: item.status,
          });
        });

        state.toursData = {
          ...data.data,
          tours: toursArray,
        };
      }
    });

    // UPDATE TOUR STATUS
    builder.addCase(updateTourStatus.pending, state => {
      state.loading = true;
    });
    builder.addCase(updateTourStatus.rejected, state => {
      state.loading = false;
      message.error('Something went wrong! Could not update tour status');
    });
    builder.addCase(updateTourStatus.fulfilled, (state, action) => {
      state.loading = false;
      const data = action.payload;
      console.log(data);
      if (data.status === 'success') {
        //
      }
    });

    // GET ALL USERS
    builder.addCase(getAllUsers.pending, state => {
      state.loading = true;
    });
    builder.addCase(getAllUsers.rejected, state => {
      state.loading = false;
      message.error('Something went wrong! Could not get users data');
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      console.log('fulfilled');
      state.loading = false;
      const data = action.payload;
      console.log(data);
      if (data.status === 'success') {
        // console.log();
        const users = [];
        data.data.users?.map(item => {
          users.push({
            id: item.id,
            key: item.id,
            name: item.name,
            avatar: item.avatar,
            email: item.email,
            phone: item.phone,
            address: item.address,
          });
        });
        state.usersData = {
          ...data.data,
          users,
        };
      }
    });

    // GET ALL CUSTOMERS
    builder.addCase(getAllCustomers.pending, state => {
      state.loading = true;
    });
    builder.addCase(getAllCustomers.rejected, state => {
      state.loading = false;
      message.error('Something went wrong! Could not get customers data');
    });
    builder.addCase(getAllCustomers.fulfilled, (state, action) => {
      state.loading = false;
      const data = action.payload;
      console.log(data);
      if (data.status === 'success') {
        // console.log();
        const customers = [];
        data.data.customers?.map(item => {
          customers.push({
            id: item.id,
            key: item.id,
            name: item.name,
            avatar: item.avatar,
            email: item.email,
            phone: item.phone,
            address: item.address,
          });
        });
        state.customersData = {
          ...data.data,
          customers,
        };
      }
    });
  },
});

export default adminSlice;
