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
      message.error({
        content: 'Can not connect to server. Please check your internet',
        key: 'tour-rejected',
      });
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
      message.error({
        content: 'Can not connect to server. Please check your internet',
        key: 'tour-rejected',
      });
    });
    builder.addCase(getToursByFilter.fulfilled, (state, action) => {
      state.loading = false;
      let { data } = action.payload;
      state.destinations = data.data.destinations;
      state.services = data.data.services;
      state.totalTours = data.data.totalTours;

      if (data.data.tours) {
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
      } else {
        state.listFilter = [];
      }
    });
    builder.addCase(getDetailTour.pending, state => {
      state.loading = true;
    });
    builder.addCase(getDetailTour.rejected, state => {
      state.loading = false;
      message.error({
        content: 'Can not connect to server. Please check your internet',
        key: 'tour-rejected',
      });
    });
    builder.addCase(getDetailTour.fulfilled, (state, action) => {
      let data = action.payload;
      console.log(action.payload);
      state.loading = false;
      let priceDate = [];
      let temp = [];
      let relatedTours = [];
      priceDate = data.data.data.schedule.map(item => item);
      temp = data.data.data.schedule.map(item => item.startDate);
      relatedTours = data.data.data.relatedTour.map(item => ({
        id: item.id,
        image: item.tourImages,
        name: item.title,
        duration: item.duration,
        maxPeople: item.maxPeople,
        tourDestination: item.destination[0].destination,
        minPrice: item.schedule[0].ticket[2].price,
        maxPrice: item.schedule[0].ticket[0].price,
      }));
      state.tour = {
        ...data.data.data,
        availableDate: temp,
        priceFollowDate: priceDate,
        relatedTour: relatedTours,
      };
    });
  },
});

export default toursSlice;
