import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { fetchWords } from '../../../store/wordsSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { RootState } from '../../../store/store';

import { IWord } from '../../../models/Dictionary/IWord';
import { AddFAB } from '../../../components/AddFAB/AddFAB';
import AppBars, { BarGuiding } from '../../../components/AppBars/AppBars';
import { WordCardsList } from './components/WordCardsList';
import { useHeight } from '../../../components/AddFAB/useHeight';
import { MUI_SIZE_PX } from '../../../constants';
import { Forms, FormState } from './components/Form/Forms';

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
  //const [isAddFormOpened, setIsAddFormOpened] = useState(false);
  const [formState, setFormState] = useState<FormState>(FormState.CLOSED);
  const [curWord, setCurWord] = useState<IWord | null>(null);

  const { ref: fabRef, height: fabHeight, other } = useHeight(['bottom']);
  const fabBottom = parseInt(other?.bottom ?? 16, 10);
  const wordsMargin = useMemo(
    () => Math.ceil((fabBottom * 2 + fabHeight) / MUI_SIZE_PX),
    [fabHeight, fabBottom],
  );

  const words = useAppSelector(selectWords);

  useEffect(() => {
    if (!dictionaryId) {
      console.error('No dictionary id');
    }
  }, []);

  useEffect(() => {
    dispatch(fetchWords(numDictionaryId));
  }, [numDictionaryId]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleEditWordClicked = (word: IWord) => {
    setCurWord(() => word);
    setFormState(FormState.EDIT);
  };

  const handleFormClosed = () => {
    setFormState(FormState.CLOSED);
  };

  const handleAddBtnClicked = () => {
    setFormState(FormState.NEW);
  };

  const content = words.length ? (
    <WordCardsList
      words={words}
      marginBottom={wordsMargin}
      onEditClicked={handleEditWordClicked}
    />
  ) : (
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
        ref={fabRef}
      />
      <Forms
        state={formState}
        wordToEdit={curWord}
        onClose={handleFormClosed}
        dictionaryId={numDictionaryId}
      />
    </AppBars.Top>
  );
};
