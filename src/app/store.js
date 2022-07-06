import { configureStore } from '@reduxjs/toolkit';

import adminSlice from './AdminSlice';
import registerSlice from './RegisterSlice';
import checkoutSlice from './checkoutSlice';
import loginSlice from './loginSlice';
import orderSlice from './orderSlice';
import toursSlice from './toursSlice';

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    register: registerSlice.reducer,
    tours: toursSlice.reducer,
    admin: adminSlice.reducer,
    checkout: checkoutSlice.reducer,
    order: orderSlice.reducer,
  },
});
