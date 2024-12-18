import { configureStore } from '@reduxjs/toolkit';
import slice from './cartSlice';

const store = configureStore({
  reducer: {
    myslice: slice,
  },
});

export default store;
