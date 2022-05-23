import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StateStatuses } from './types';
import { IVocabulary, INewVocabulary } from '../models/Vocabulary/IVocabulary';
import { VocabulariesAPI } from '../services/vocabulariesService';

const name = 'vocabularies';

type TVocabulariesState = {
  status: StateStatuses,
  vocabularies: IVocabulary[],
}

const initialState: TVocabulariesState = {
  status: StateStatuses.IDLE,
  vocabularies: [],
};

export const fetchVocabularies = createAsyncThunk(
  `${name}/fetchVocabularies`,
  async () => await VocabulariesAPI.getVocabularies(),
);

export const postVocabularies = createAsyncThunk(
  `${name}/postVocabularies`,
  async (vocabulary: INewVocabulary) => await VocabulariesAPI.postVocabulary(vocabulary),
);

export const vocabulariesSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchVocabularies
      .addCase(fetchVocabularies.pending, (state) => {
        state.status = StateStatuses.LOADING;
      })
      .addCase(fetchVocabularies.fulfilled, (state, action) => {
        state.status = StateStatuses.IDLE;
        state.vocabularies = action.payload;
      })
      .addCase(fetchVocabularies.rejected, (state) => {
        state.status = StateStatuses.ERROR;
      })
      // postVocabularies
      .addCase(postVocabularies.pending, (state) => {
        state.status = StateStatuses.LOADING;
      })
      .addCase(postVocabularies.fulfilled, (state, action) => {
        state.status = StateStatuses.IDLE;
        state.vocabularies.push(action.payload);
      })
      .addCase(postVocabularies.rejected, (state) => {
        state.status = StateStatuses.ERROR;
      })
      // default
      .addDefaultCase(() => {
      });
  },
});

export default vocabulariesSlice.reducer;
