import { ORIGIN } from './constants';

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