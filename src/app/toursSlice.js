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
  idTourJustCreated: null,
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

export const createTour = createAsyncThunk(
  'tours/create-tour',
  async params => {
    const res = await tourAPI.createTour(params);
    return res;
  },
);

const toursSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {
    clearIdTourJustCreate: state => {
      state.idTourJustCreated = null;
    },
  },
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

    builder.addCase(createTour.pending, state => {
      state.loading = true;
    });
    builder.addCase(createTour.rejected, state => {
      state.loading = false;
      message.error('Can not connect to server. Please check your internet');
    });
    builder.addCase(createTour.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.loading = false;
      state.idTourJustCreated = data.data.id;
    });
  },
});

export const { clearIdTourJustCreate } = toursSlice.actions;
export default toursSlice;
