import { IWord } from '../models/interfaces/IWord';

const origin = 'http://localhost:3000';
const route = 'words';

export const getWords = (): Promise<any> => {
  try {
    return fetch(`${origin}/${route}`).then(response => {
      if (!response.ok) {
        throw new Error();
      }

      const data = response.json();
      return data;
    });
  } catch (e: any) {
    console.error(e.message);
    throw e;
  }
};

export const postWord = (word: IWord): Promise<any> => {
  try {
    const params = {
      method: 'POST',
      body: JSON.stringify(word),
      headers: {'Content-Type': 'application/json'},
    };
    return fetch(`${origin}/${route}`, params);
  } catch (e: any) {
    console.error(e.message);
    throw e;
  }
};