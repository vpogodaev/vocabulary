import { ORIGIN } from './constants';
import { INewDictionary } from '../models/Dictionary/IDictionary';

const route = 'dictionaries';

export const getDictionaries = (): Promise<any> => {
  try {
    const url = `${ORIGIN}/${route}`;

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }

        return response.json();
      });
  } catch (e: any) {
    console.error(e.message);
    throw e;
  }
};

export const postDictionary = (dictionary: INewDictionary) => {
  try {
    const url = `${ORIGIN}/${route}`;

    const params = {
      method: 'POST',
      body: JSON.stringify(dictionary),
      headers: {'Content-type': 'application/json'},
    };

    return fetch(url, params);
  } catch (e: any) {
    console.error(e.message);
    throw e;
  }
};