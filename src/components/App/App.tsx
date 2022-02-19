import React, { useEffect, useState } from 'react';

import WordList from '../WordList/WordList';
import WordForm from '../WordForm/WordForm';
import { getWords, postWord } from '../../services/wordsService';

export interface IWord {
  id: number;
  //TODO: tmp
  firstLanguageValue: string;
  secondLanguageValue: string;
}

const initWords: IWord[] = [
  {id: 1, firstLanguageValue: 'тест 1', secondLanguageValue: 'test 1'},
  {id: 2, firstLanguageValue: 'тест 2', secondLanguageValue: 'test 2'},
];

function App() {
  const [words, setWords] = useState(initWords);

  const loadWords = () => {
    getWords().then(data => {
      if (data) {
        setWords(data);
      }
    });
  }

  useEffect(() => {
    loadWords();
  }, []);

  const handleFormSubmit = (flv: string, slv: string) => {
    const word: IWord = {
      id: Math.max(...(words.map(w => w.id))) + 1,
      firstLanguageValue: flv,
      secondLanguageValue: slv,
    };

    postWord(word).then(r => {
      if (r.ok) {
        //setWords(list => [...list, word]);
        loadWords();
      }
    });
  };

  return (
    <div>
      <WordForm onFormSubmit={handleFormSubmit} />
      <WordList words={words} />
    </div>
  );
}

export default App;
