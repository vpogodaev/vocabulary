import React, { useEffect, useState } from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { getWords, postWord } from '../../services/wordsService';
import { INewWord, IWord } from '../../models/interfaces/IWord';

import WordList from '../../components/WordList/WordList';

import styles from './MainPage.module.scss';
import Form from '../../components/Form/Form';


// This page for all testing now


declare type TMainPageProps = {};

const initWords: IWord[] = [
  {id: 1, value1: 'тест 1', value2: 'test 1'},
  {id: 2, value1: 'тест 2', value2: 'test 2'},
];

const MainPage: React.FC<TMainPageProps> = ({}): JSX.Element => {
  const [words, setWords] = useState(initWords);
  const [isAddFormOpened, setIsAddFormOpened] = useState(false);

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

  const handleFormSubmit = ({value1, value2}: INewWord) => {
    const word: IWord = {
      id: Math.max(...(words.map(w => w.id))) + 1,
      value1,
      value2,
    };

    postWord(word).then(r => {
      if (r.ok) {
        //setWords(list => [...list, word]);
        loadWords();
      }
    });
  };

  const handleNewWordClicked = () => {
    setIsAddFormOpened((pv) => !pv);
  };

  const handleFormClosed = () => {
    setIsAddFormOpened(() => false);
  };

  return (
    <>
      <Words words={words}
             onAddClicked={handleNewWordClicked} />
      <Form open={isAddFormOpened}
            onClose={handleFormClosed}
            onSubmit={handleFormSubmit} />
    </>
  );
};

declare type TWordsProps = {
  words: IWord[];
  onAddClicked: () => void;
};

const Words: React.FC<TWordsProps> = ({words, onAddClicked}) => {
  return (
    <>
      <WordList words={words} />
      <Fab color="primary"
           aria-label="add"
           sx={{position: 'sticky', bottom: 16, left: '100%'}}
           onClick={onAddClicked}>
        <AddIcon />
      </Fab>
    </>
  );
};

export default MainPage;