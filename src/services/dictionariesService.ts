import { ORIGIN } from './constants';
import { IDictionary, INewDictionary } from '../models/Dictionary/IDictionary';
import { httpFetch, Methods } from './http';

const route = 'dictionaries';

const getDictionaries = (): Promise<IDictionary[]> => {
  return httpFetch<IDictionary[]>(`${ORIGIN}/${route}`);
};

const postDictionary = (dictionary: INewDictionary) => {
  return httpFetch<IDictionary>(`${ORIGIN}/${route}`, Methods.POST, dictionary);
};

export const DictionariesAPI = {
  getDictionaries,
  postDictionary,
};