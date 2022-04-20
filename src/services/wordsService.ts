import { IWord } from '../models/Dictionary/IWord';
import { ORIGIN } from './constants';
import { httpFetch } from './http';

const route = 'words';

export const getWords = (dictionaryId: number): Promise<IWord[]> => httpFetch<IWord[]>(`${ORIGIN}/${route}?dictionaryId=${dictionaryId}`);

export const postWord = (word: IWord): Promise<any> => {
  try {
    const params = {
      method: 'POST',
      body: JSON.stringify(word),
      headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`${ORIGIN}/${route}`, params);
  } catch (e: any) {
    console.error(e.message);
    throw e;
  }
};

export const WordsAPI = {
  getWords,
  postWord,
};
