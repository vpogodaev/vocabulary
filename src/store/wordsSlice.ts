import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IWord } from '../models/interfaces/interfaces';
import { ORIGIN } from '../services/constants';
import { httpFetch } from '../services/http';
import { StateStatuses } from './types';

const name = 'words';
const route = 'words';

type IWordsState = {
  status: StateStatuses,
  words: IWord[],
}

const initialState: IWordsState = {
  status: StateStatuses.IDLE,
  words: [],
};

export const fetchWords = createAsyncThunk(
  'words/fetchWords',
  async () => await httpFetch<IWord[]>(`${ORIGIN}/${route}`) as IWord[],
);

export const wordsSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWords.pending, (state) => {
        state.status = StateStatuses.LOADING;
      })
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.status = StateStatuses.IDLE;
        state.words = action.payload;
      })
      .addCase(fetchWords.rejected, (state, action) => {
        state.status = StateStatuses.ERROR;
      })
      .addDefaultCase(() => {
      });
  },
});

export default wordsSlice.reducer;
