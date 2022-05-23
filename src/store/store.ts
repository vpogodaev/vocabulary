import { configureStore } from '@reduxjs/toolkit';

import words from './wordsSlice';
import vocabularies from './vocabulariesSlice';

export const store = configureStore({
  reducer: {
    words,
    vocabularies,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
