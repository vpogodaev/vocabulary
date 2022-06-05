import { INewWord, IWord } from '../models/Vocabulary/IWord';
import { ORIGIN } from './constants';
import { httpFetch, Methods } from './http';

const route = 'words';

export const getWords = (vocabularyId: number): Promise<IWord[]> =>
  httpFetch<IWord[]>(`${ORIGIN}/${route}?vocabularyId=${vocabularyId}`);

export const postWord = (word: INewWord): Promise<IWord> =>
  httpFetch<IWord>(`${ORIGIN}/${route}`, word, Methods.POST);

export const putWord = (word: IWord): Promise<IWord> =>
  httpFetch<IWord>(`${ORIGIN}/${route}/${word.id}`, word, Methods.PUT);

export const WordsAPI = {
  getWords,
  postWord,
  putWord,
};
