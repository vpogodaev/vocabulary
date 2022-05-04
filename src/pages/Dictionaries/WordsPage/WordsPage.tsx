import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { fetchWords, postWord } from '../../../store/wordsSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { RootState } from '../../../store/store';

import { INewWord, IWord } from '../../../models/Dictionary/IWord';
import { AddFAB } from '../../../components/AddFAB/AddFAB';
import AppBars, { BarGuiding } from '../../../components/AppBars/AppBars';
import { WordsList } from './components/WordsList';
import { TElementPropsWithId } from '../../../components/ElementsList/elementProps';
import { NewWordForm } from './components/NewWordForm';
import { WordCard } from './components/WordCard';
import { WordCardsList } from './components/WordCardsList';

type TWordsPageProps = {};

declare type TWordsProps = {
  words: IWord[];
  onAddClicked: () => void;
};

const getPageName = (name: string) => `Dictionary ${name}`;

const NoWords = () => (
  <Box sx={{ height: '100%', pt: '40%', textAlign: 'center' }}>
    <span>No words found!</span>
  </Box>
);

const selectWords = (state: RootState) => state.words.words;

export const WordsPage: React.FC<TWordsPageProps> = ({}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { dictionaryId } = useParams();

  const [numDictionaryId] = useState<number>(dictionaryId ? +dictionaryId : 0);

  const words = useAppSelector(selectWords);

  const [isAddFormOpened, setIsAddFormOpened] = useState(false);

  useEffect(() => {
    if (!dictionaryId) {
      console.error('No dictionary id');
    }
  }, []);

  useEffect(() => {
    dispatch(fetchWords(numDictionaryId));
  }, [numDictionaryId]);

  const handleFormSubmit = (newWord: INewWord) => {
    newWord.dictionaryId = numDictionaryId;

    dispatch(postWord(newWord));
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleWordClick = (word: TElementPropsWithId) => {
    console.log(word);
  };

  const handleFormClosed = () => {
    setIsAddFormOpened(() => false);
  };

  const handleAddBtnClicked = () => {
    setIsAddFormOpened((pv) => !pv);
  };

  const content = words.length ? (
    <WordCardsList words={words} />
  ) : (
    // <WordCard word={words[2]}/>
    // <WordsList
    //   words={words}
    //   onClick={handleWordClick}
    // />
    <NoWords />
  );

  return (
    <AppBars.Top
      title={getPageName('name')}
      guiding={BarGuiding.back}
      onGuidingClick={handleBackClick}
    >
      {content}
      <AddFAB
        color="primary"
        onClick={handleAddBtnClicked}
      />
      <NewWordForm
        isOpened={isAddFormOpened}
        onClose={handleFormClosed}
        onSubmit={handleFormSubmit}
      />
    </AppBars.Top>
  );
};
