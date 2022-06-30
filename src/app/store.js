import { configureStore } from '@reduxjs/toolkit';

import loginSlice from '../pages/Login/LoginSlice';
import registerSlice from '../pages/Register/RegisterSlice';

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    register: registerSlice.reducer,
  },
});
