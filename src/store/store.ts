import { configureStore } from '@reduxjs/toolkit';

import words from './wordsSlice';
import dictionaries from './dictionariesSlice';

export const store = configureStore({
  reducer: {
    words,
    dictionaries,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
