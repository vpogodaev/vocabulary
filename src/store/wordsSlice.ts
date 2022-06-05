import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { INewWord, IWord } from '../models/Vocabulary/IWord';
import { StateStatuses } from './types';
import { WordsAPI } from '../services/wordsAPI';
import { RootState } from './store';

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
  async (vocabularyId: number) => await WordsAPI.getWords(vocabularyId),
);

export const postNewWord = createAsyncThunk(
  `${name}/postNewWord`,
  async (word: INewWord) => await WordsAPI.postWord(word),
);

export const editOldWord = createAsyncThunk(
  `${name}/editOldWord`,
  async (word: IWord) => await  WordsAPI.putWord(word),
)

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
      .addCase(postNewWord.pending, (state) => {
        state.status = StateStatuses.LOADING;
      })
      .addCase(postNewWord.fulfilled, (state, action) => {
        state.status = StateStatuses.IDLE;
        state.words.push(action.payload);
      })
      .addCase(postNewWord.rejected, (state) => {
        state.status = StateStatuses.ERROR;
      })
      .addCase(editOldWord.pending, (state) => {
        state.status = StateStatuses.LOADING;
      })
      .addCase(editOldWord.fulfilled, (state, action) => {
        state.status = StateStatuses.IDLE;
        const { id } = action.payload;
        const index = state.words.findIndex(w => w.id === id);
        state.words[index] = action.payload;
      })
      .addCase(editOldWord.rejected, (state) => {
        state.status = StateStatuses.ERROR;
      })
      .addDefaultCase(() => {});
  },
});

export default wordsSlice.reducer;

// selectors
export const selectWords = (state: RootState) => state.words.words;
