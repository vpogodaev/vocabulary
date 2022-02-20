import React, { useEffect, useState } from 'react';

import WordList from '../WordList/WordList';
import WordForm from '../WordForm/WordForm';

import { getWords, postWord } from '../../services/wordsService';

import styles from './App.module.scss';
import { Container, CssBaseline } from '@mui/material';

export interface IWord {
  id: number;
  //TODO: tmp
  value1: string;
  value2: string;
}

const initWords: IWord[] = [
  {id: 1, value1: 'тест 1', value2: 'test 1'},
  {id: 2, value1: 'тест 2', value2: 'test 2'},
];

function App() {
  const [words, setWords] = useState(initWords);

  const loadWords = () => {
    getWords().then(data => {
      if (data) {
        setWords(data);
      }
    });
  };

  useEffect(() => {
    loadWords();
  }, []);

  const handleFormSubmit = (flv: string, slv: string) => {
    const word: IWord = {
      id: Math.max(...(words.map(w => w.id))) + 1,
      value1: flv,
      value2: slv,
    };

    postWord(word).then(r => {
      if (r.ok) {
        //setWords(list => [...list, word]);
        loadWords();
      }
    });
  };

  return (
    <div className={styles.App}>
      <CssBaseline />

      <Container maxWidth="sm">
        <WordForm onFormSubmit={handleFormSubmit} />
        <WordList words={words} />
      </Container>
    </div>
  );
}

export default App;
