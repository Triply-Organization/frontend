import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import moment from 'moment';

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
  toursCustomer: [],
  popularTours: [],
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

export const getToursCustomer = createAsyncThunk(
  'tours/get-tour-customer',
  async () => {
    const res = await tourAPI.getToursOfCustomer();
    return res;
  },
);

export const deleteTour = createAsyncThunk(
  'tours/delete-tour',
  async (params, thunkAPI) => {
    const res = await tourAPI.deleteTour(params);
    thunkAPI.dispatch(getToursCustomer());
    return res;
  },
);

export const updateTour = createAsyncThunk(
  'tours/update-tour',
  async (params, thunkAPI) => {
    const res = await tourAPI.updateTour(params);
    thunkAPI.dispatch(getDetailTour(params.id));
    return res;
  },
);

export const getPopularTours = createAsyncThunk(
  'tours/popular-tours',
  async () => {
    const res = await tourAPI.getPopularTours();
    return res.data;
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
      state.destinations = data.data?.destinations;
      state.services = data.data?.services;
      state.totalTours = data.data?.totalTours;

      if (data.data?.tours) {
        const res = data.data.tours?.map(item => {
          return {
            id: item.id,
            rating: item.rating?.avg,
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
    builder.addCase(getToursCustomer.pending, state => {
      state.loading = true;
    });
    builder.addCase(getToursCustomer.rejected, state => {
      state.loading = false;
      message.error('Can not connect to server. Please check your internet');
    });
    builder.addCase(getToursCustomer.fulfilled, (state, action) => {
      state.loading = false;
      const { data } = action.payload;
      const tempData = data.data.map(item => ({
        id: item.id,
        key: item.id,
        title: item.title,
        destination: item.destination[0],
        duration: item.duration,
        availableDay: item.schedule,
        max_people: item.maxPeople,
        min_age: item.minAge,
        status: item.status,
        createdAt: moment(item.createdAt.date).format('YYYY-MM-DD'),
      }));
      state.toursCustomer = tempData;
    });

    builder.addCase(updateTour.pending, state => {
      state.loading = true;
    });
    builder.addCase(updateTour.rejected, state => {
      state.loading = false;
      message.error('Can not connect to server. Please check your internet');
    });
    builder.addCase(updateTour.fulfilled, state => {
      state.loading = false;
      message.success('Update successful');
    });

    builder.addCase(getPopularTours.pending, state => {
      state.loading = true;
    });
    builder.addCase(getPopularTours.rejected, state => {
      state.loading = false;
      message.error('Can not connect to server. Please check your internet');
    });
    builder.addCase(getPopularTours.fulfilled, (state, action) => {
      state.loading = false;
      const data = action.payload;
      if (data.status === 'success') {
        const popularData = data.data.popularTour;
        const popularTours = [];
        popularData?.map(item => {
          let tourMinPrice = 0;
          let tourMaxPrice = 0;
          item.schedule?.forEach(i => {
            tourMinPrice = Math.max(tourMinPrice, i.ticket[0].price);
            tourMaxPrice = Math.max(tourMaxPrice, i.ticket[2].price);
          });

          popularTours.push({
            tourDestination: item.destinations[0].destination,
            image: item.image,
            duration: item.duration,
            maxPeople: item.maxPeople,
            rating: item.rate,
            name: item.title,
            minPrice: tourMinPrice,
            maxPrice: tourMaxPrice,
            id: item.id,
            totalReviews: item.totalReview,
          });
        });
        state.popularTours = popularTours;
      }
    });
  },
});

export const { clearIdTourJustCreate } = toursSlice.actions;
export default toursSlice;
