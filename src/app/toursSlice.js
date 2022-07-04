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
  totalTours: 0,
};

export const bookTour = createAsyncThunk('tours/booking', async params => {
  // const res = await tourAPI.getTourById(params)
  // return res
  console.log(params);
});

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
        state.totalTours = data.data.totalTours;

        const res = data.data.tours.map(item => {
          return {
            id: item.id,
            duration: item.duration,
            maxPeople: item.maxPeople,
            name: item.title,
            image: item.tourImages,
            maxPrice: Math.max(
              ...item.schedule.map(s => s.ticket.map(t => t.price))[0],
            ),
            minPrice: Math.min(
              ...item.schedule.map(s => s.ticket.map(t => t.price))[0],
            ),
            tourDestination: item.destination.map(item => item.destination)[0],
          };
        });
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
      let { data } = action.payload;
      if (data.status === 'success') {
        state.destinations = data.data.destinations;
        state.services = data.data.services;
        state.totalTours = data.data.totalTours;

        const res = data.data.tours.map(item => {
          return {
            id: item.id,
            duration: item.duration,
            maxPeople: item.maxPeople,
            name: item.title,
            image: item.tourImages,
            maxPrice: Math.max(
              ...item.schedule.map(s => s.ticket.map(t => t.price))[0],
            ),
            minPrice: Math.min(
              ...item.schedule.map(s => s.ticket.map(t => t.price))[0],
            ),
            tourDestination: item.destination.map(item => item.destination)[0],
          };
        });
        state.listFilter = res;
      }
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
      state.tour = data.data.data;
    });
    // builder.addCase(bookTour.pending, state => {
    //   state.loading = true;
    // });
    // builder.addCase(bookTour.rejected, state => {
    //   state.loading = false;
    //   message.error('Can not connect to server. Please check your internet');
    // });
    // builder.addCase(bookTour.fulfilled, (state, action) => {
    //   let data = action.payload;
    //   state.loading = false;
    //   console.log(data)
    // });
  },
});

export default toursSlice;
