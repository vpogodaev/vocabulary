import { configureStore } from '@reduxjs/toolkit';
import words from './wordsSlice';

const store = configureStore({
  reducer: {
    words,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;