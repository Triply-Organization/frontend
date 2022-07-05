import { configureStore } from '@reduxjs/toolkit';

import loginSlice from '../pages/Login/LoginSlice';
import registerSlice from '../pages/Register/RegisterSlice';
import adminSlice from './AdminSlice';
import toursSlice from './toursSlice';

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    register: registerSlice.reducer,
    tours: toursSlice.reducer,
    admin: adminSlice.reducer,
  },
});
