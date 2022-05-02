import { INewWord, IWord } from '../models/Dictionary/IWord';
import { ORIGIN } from './constants';
import { httpFetch, Methods } from './http';

const route = 'words';

export const getWords = (dictionaryId: number): Promise<IWord[]> => httpFetch<IWord[]>(`${ORIGIN}/${route}?dictionaryId=${dictionaryId}`);

export const postWord = (word: INewWord): Promise<IWord> => httpFetch<IWord>(`${ORIGIN}/${route}`, word, Methods.POST);

export const WordsAPI = {
  getWords,
  postWord,
};
