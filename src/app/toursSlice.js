import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';

import { tourAPI } from '../api/tourAPI';

const initialState = {
  destinations: [],
  services: [],
  list: [],
  tour: {},
  listFilter: [],
  loading: false,
  booking: {},
};

export const getDetailTour = createAsyncThunk('tours/detail', async params => {
  const res = await tourAPI.getTourById(params);
  return res;
});

export const getListTours = createAsyncThunk('tours/get-all', async () => {
  const res = await tourAPI.getAll();
  return res;
});
export const getDestinationsServiceTours = createAsyncThunk(
  'tours/get-destination-service-tours',
  async () => {
    const res = await tourAPI.getDestinationsServiceTours();
    return res;
  },
);

export const getToursByFilter = createAsyncThunk(
  'tours/get-tours-by-filter',
  async params => {
    const res = await tourAPI.getToursByFilter(params);
    return res;
  },
);

const toursSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getDestinationsServiceTours.pending, state => {
      state.loading = true;
    });
    builder.addCase(getDestinationsServiceTours.rejected, state => {
      state.loading = false;
      message.error('Can not connect to server. Please check your internet');
    });
    builder.addCase(getDestinationsServiceTours.fulfilled, (state, action) => {
      state.loading = false;
      let { data } = action.payload;
      if (data.status === 'success') {
        state.destinations = data.data.destinations;
        state.services = data.data.services;

        const res = data.data.tours.map(item => ({
          ...item,
          name: item.title,
          image: item.tourImages,
        }));
        state.list = res;
      }
    });

    builder.addCase(getToursByFilter.pending, state => {
      state.loading = true;
    });
    builder.addCase(getToursByFilter.rejected, state => {
      state.loading = false;
      message.error('Can not connect to server. Please check your internet');
    });
    builder.addCase(getToursByFilter.fulfilled, (state, action) => {
      state.loading = false;
      let { data } = action.payload.data;
      const res = data.tours.map(item => ({
        ...item,
        name: item.title,
        image: item.tourImages,
      }));

      state.listFilter = res;
    });
    builder.addCase(getDetailTour.pending, state => {
      state.loading = true;
    });
    builder.addCase(getDetailTour.rejected, state => {
      state.loading = false;
      message.error('Can not connect to server. Please check your internet');
    });
    builder.addCase(getDetailTour.fulfilled, (state, action) => {
      let data = action.payload;
      state.loading = false;
      let priceDate = [];
      let temp = [];
      priceDate = data.data.data.schedule.map(item => item);
      temp = data.data.data.schedule.map(item => item.startDate);
      state.tour = {
        ...data.data.data,
        availableDate: temp,
        priceFollowDate: priceDate,
      };
    });
  },
});

export default toursSlice;
