import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StateStatuses } from './types';
import { IDictionary, INewDictionary } from '../models/Dictionary/IDictionary';
import { DictionariesAPI } from '../services/dictionariesService';

const name = 'dictionaries';

type TDictionariesState = {
  status: StateStatuses,
  dictionaries: IDictionary[],
}

const initialState: TDictionariesState = {
  status: StateStatuses.IDLE,
  dictionaries: [],
};

export const fetchDictionaries = createAsyncThunk(
  `${name}/fetchDictionaries`,
  async () => await DictionariesAPI.getDictionaries(),
);

export const postDictionary = createAsyncThunk(
  `${name}/postDictionaries`,
  async (dictionary: INewDictionary) => await DictionariesAPI.postDictionary(dictionary),
);

export const dictionariesSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchDictionaries
      .addCase(fetchDictionaries.pending, (state) => {
        state.status = StateStatuses.LOADING;
      })
      .addCase(fetchDictionaries.fulfilled, (state, action) => {
        state.status = StateStatuses.IDLE;
        state.dictionaries = action.payload;
      })
      .addCase(fetchDictionaries.rejected, (state) => {
        state.status = StateStatuses.ERROR;
      })
      // postDictionary
      .addCase(postDictionary.pending, (state) => {
        state.status = StateStatuses.LOADING;
      })
      .addCase(postDictionary.fulfilled, (state, action) => {
        state.status = StateStatuses.IDLE;
        state.dictionaries.push(action.payload);
      })
      .addCase(postDictionary.rejected, (state) => {
        state.status = StateStatuses.ERROR;
      })
      // default
      .addDefaultCase(() => {
      });
  },
});

export default dictionariesSlice.reducer;
