import { configureStore } from '@reduxjs/toolkit';

import loginSlice from '../pages/Login/LoginSlice';

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
  },
});
