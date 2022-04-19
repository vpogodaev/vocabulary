import React, { useEffect, useState } from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import Form from '../../components/Form/Form';
import WordList from '../../components/WordList/WordList';

import { INewWord, IWord } from '../../models/interfaces/interfaces';
import { postWord } from '../../services/wordsService';

import styles from './Words.module.scss';
import { AddFAB } from '../../components/AddFAB/AddFAB';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchWords } from '../../store/wordsSlice';

type TWordsPageProps = {};

declare type TWordsProps = {
  words: IWord[];
  onAddClicked: () => void;
};

const Words: React.FC<TWordsProps> = ({ words, onAddClicked }) => (
  <>
    <WordList words={words} />
    <AddFAB
      color="primary"
      onClick={onAddClicked}
    />
  </>
);

export const WordsPage: React.FC<TWordsPageProps> = ({}) => {
  const dispatch = useAppDispatch();

  const words = useAppSelector((state) => state.words.words);

  // const [words, setWords] = useState(initWords);
  const [isAddFormOpened, setIsAddFormOpened] = useState(false);

  const loadWordsAsync = async () => {
    const result = await dispatch(fetchWords);
    console.log(result);
  };

  const loadWords = () => {
  };

  useEffect(() => {
    dispatch(fetchWords());
  }, []);

  const handleFormSubmit = ({ value1, value2 }: INewWord) => {
    const word: IWord = {
      id: Math.max(...(
        words.map((w) => w.id)
      )) + 1,
      value1,
      value2,
    };

    postWord(word).then((r) => {
      if (r.ok) {
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
      <Words
        words={words}
        onAddClicked={handleNewWordClicked}
      />
      <Form
        open={isAddFormOpened}
        onClose={handleFormClosed}
        onSubmit={handleFormSubmit}
      />
    </>
  );
};
