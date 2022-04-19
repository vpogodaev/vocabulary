import { ORIGIN } from './constants';
import { IDictionary, INewDictionary } from '../models/Dictionary/IDictionary';
import { httpFetch, Methods } from './http';

const route = 'dictionaries';

const getDictionaries = (): Promise<IDictionary[]> => httpFetch<IDictionary[]>(`${ORIGIN}/${route}`);

const postDictionary = (dictionary: INewDictionary) => httpFetch<IDictionary>(`${ORIGIN}/${route}`, dictionary, Methods.POST);

export const DictionariesAPI = {
  getDictionaries,
  postDictionary,
};
