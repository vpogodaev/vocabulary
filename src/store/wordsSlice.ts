import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IWord } from '../models/interfaces/interfaces';
import { ORIGIN } from '../services/constants';

const name = 'words';
const route = 'words';

enum Statuses {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR'
}

type IWordsState = {
  status: Statuses,
  words: IWord[],
}

const initialState: IWordsState = {
  status: Statuses.IDLE,
  words: [],
};

export const fetchWords = createAsyncThunk(
  `${name}/fetchWords`,
  async () => {
    const response = await fetch(`${ORIGIN}/${route}`);
    return (
      await response.json()
    ) as IWord[];
  },
);

export const wordsSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWords.pending, (state) => {
        state.status = Statuses.LOADING;
      })
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.status = Statuses.IDLE;
        state.words = action.payload;
      })
      .addCase(fetchWords.rejected, (state) => {
        state.status = Statuses.ERROR;
      })
      .addDefaultCase(() => {
      });
  },
});

export default wordsSlice.reducer;