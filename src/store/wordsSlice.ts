import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { INewWord, IWord } from '../models/Dictionary/IWord';
import { StateStatuses } from './types';
import { WordsAPI } from '../services/wordsService';

const name = 'words';

type IWordsState = {
  status: StateStatuses;
  words: IWord[];
};

const initialState: IWordsState = {
  status: StateStatuses.IDLE,
  words: [],
};

export const fetchWords = createAsyncThunk(
  `${name}/fetchWords`,
  async (dictionaryId: number) => await WordsAPI.getWords(dictionaryId),
);

export const postWord = createAsyncThunk(
  `${name}/postWords`,
  async (word: INewWord) => await WordsAPI.postWord(word),
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
      .addCase(postWord.pending, (state) => {
        state.status = StateStatuses.LOADING;
      })
      .addCase(postWord.fulfilled, (state, action) => {
        state.status = StateStatuses.IDLE;
        console.log('postWords.fullfilled', action.payload);
        state.words.push(action.payload);
      })
      .addCase(postWord.rejected, (state) => {
        state.status = StateStatuses.ERROR;
      })
      .addDefaultCase(() => {});
  },
});

export default wordsSlice.reducer;
