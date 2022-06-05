import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StateStatuses } from './types';
import { IVocabulary, INewVocabulary } from '../models/Vocabulary/IVocabulary';
import { VocabulariesAPI } from '../services/vocabulariesAPI';
import { RootState } from './store';

const name = 'vocabularies';

type TVocabulariesState = {
  status: StateStatuses;
  vocabularies: IVocabulary[];
  currentVocabulary?: IVocabulary;
};

const initialState: TVocabulariesState = {
  status: StateStatuses.IDLE,
  vocabularies: [],
  currentVocabulary: undefined,
};

export const fetchVocabularies = createAsyncThunk(
  `${name}/fetchVocabularies`,
  async () => await VocabulariesAPI.fetchVocabularies(),
);

export const fetchVocabulary = createAsyncThunk(
  `${name}/fetchVocabulary`,
  async (vocabularyId: number) =>
    await VocabulariesAPI.fetchVocabulary(vocabularyId),
);

export const postVocabulary = createAsyncThunk(
  `${name}/postVocabulary`,
  async (vocabulary: INewVocabulary) =>
    await VocabulariesAPI.postVocabulary(vocabulary),
);

export const deleteVocabulary = createAsyncThunk(
  `${name}/deleteVocabulary`,
  async (vocabularyId: number) => {
    await VocabulariesAPI.deleteVocabulary(vocabularyId);
    return { id: vocabularyId };
  },
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
      // fetchVocabulary
      .addCase(fetchVocabulary.pending, (state) => {
        state.status = StateStatuses.LOADING;
      })
      .addCase(fetchVocabulary.fulfilled, (state, action) => {
        state.status = StateStatuses.IDLE;
        state.currentVocabulary = action.payload;
      })
      .addCase(fetchVocabulary.rejected, (state) => {
        state.status = StateStatuses.ERROR;
      })
      // postVocabulary
      .addCase(postVocabulary.pending, (state) => {
        state.status = StateStatuses.LOADING;
      })
      .addCase(postVocabulary.fulfilled, (state, action) => {
        state.status = StateStatuses.IDLE;
        state.vocabularies.push(action.payload);
      })
      .addCase(postVocabulary.rejected, (state) => {
        state.status = StateStatuses.ERROR;
      })
      // deleteVocabulary
      .addCase(deleteVocabulary.pending, (state) => {
        state.status = StateStatuses.LOADING;
      })
      .addCase(deleteVocabulary.fulfilled, (state, action) => {
        state.status = StateStatuses.IDLE;
        const { id } = action.payload;
        const index = state.vocabularies.findIndex((v) => v.id === id);
        state.vocabularies = [
          ...state.vocabularies.slice(0, index),
          ...state.vocabularies.slice(index + 1),
        ];
        // TODO history.push(-1)
      })
      .addCase(deleteVocabulary.rejected, (state) => {
        state.status = StateStatuses.ERROR;
      })
      // default
      .addDefaultCase(() => {});
  },
});

export default vocabulariesSlice.reducer;

// selectors
export const selectCurrentVocabulary = (state: RootState) =>
  state.vocabularies.currentVocabulary;
