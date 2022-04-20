import React, { useEffect, useState } from 'react';
import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// import Form from '../../../components/Form/Form';
// import WordList from '../../../components/WordList/WordList';

import { useParams } from 'react-router-dom';
import { INewWord, IWord } from '../../../models/Dictionary/IWord';
import { postWord } from '../../../services/wordsService';

import { AddFAB } from '../../../components/AddFAB/AddFAB';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchWords } from '../../../store/wordsSlice';
import AppBars from '../../../components/AppBars/AppBars';
import { RootState } from '../../../store/store';
import { WordsList } from './components/WordsList';
import { TElementPropsWithId } from '../../../components/ElementsList/elementProps';

type TWordsPageProps = {};

declare type TWordsProps = {
  words: IWord[];
  onAddClicked: () => void;
};

const getPageName = (name: string) => `Dictionary ${name}`;

const Words: React.FC<TWordsProps> = ({ words, onAddClicked }) => (
  <>
    {/* <WordList words={words} /> */}
    <AddFAB
      color="primary"
      onClick={onAddClicked}
    />
  </>
);

const NoWords = () => (
  <Box sx={{ height: '100%', pt: '40%', textAlign: 'center' }}>
    <span>
      No words found!
    </span>
  </Box>
);

const selectWords = (state: RootState) => state.words.words;

export const WordsPage: React.FC<TWordsPageProps> = ({}) => {
  const dispatch = useAppDispatch();

  const { dictionaryId } = useParams();

  const words = useAppSelector(selectWords);

  // const [words, setWords] = useState(initWords);
  const [isAddFormOpened, setIsAddFormOpened] = useState(false);

  // const loadWordsAsync = async () => {
  //   const result = await dispatch(fetchWords);
  //   console.log(result);
  // };

  const loadWords = () => {
  };

  useEffect(() => {
    dispatch(fetchWords(dictionaryId ? +dictionaryId : 0));
  }, [dictionaryId]);

  const handleFormSubmit = ({ value1, value2 }: INewWord) => {
    // const word: IWord = {
    //   id: Math.max(...(
    //     words.map((w) => w.id)
    //   )) + 1,
    //   value1,
    //   value2,
    // };
    //
    // postWord(word).then((r) => {
    //   if (r.ok) {
    //     loadWords();
    //   }
    // });
  };

  const handleNewWordClicked = () => {
    setIsAddFormOpened((pv) => !pv);
  };

  const handleFormClosed = () => {
    setIsAddFormOpened(() => false);
  };

  const handleWordClick = (word: TElementPropsWithId) => {
    console.log(word);
  };

  const content = words.length
    ? (
      <WordsList
        words={words}
        onClick={handleWordClick}
      />
    )
    : <NoWords />;

  return (
    <AppBars.Top title={getPageName('name')}>
      {content}
    </AppBars.Top>
  );
};
