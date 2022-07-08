import { configureStore } from '@reduxjs/toolkit';

import checkoutSlice from './checkoutSlice';
import loginSlice from './loginSlice';
import orderSlice from './orderSlice';
import registerSlice from './registerSlice';
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
