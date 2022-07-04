import { configureStore } from '@reduxjs/toolkit';

import loginSlice from '../pages/Login/LoginSlice';
import registerSlice from '../pages/Register/RegisterSlice';
import checkoutSlice from './checkoutSlice';
import orderSlice from './orderSlice';
import toursSlice from './toursSlice';

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    register: registerSlice.reducer,
    tours: toursSlice.reducer,
    checkout: checkoutSlice.reducer,
    order: orderSlice.reducer,
  },
});
