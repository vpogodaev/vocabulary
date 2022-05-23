import React, { useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchVocabularies, postVocabularies } from '../../../store/vocabulariesSlice';
import { useHeight } from '../../../components/AddFAB/useHeight';

import { AddFAB } from '../../../components/AddFAB/AddFAB';
import { ElementsList } from '../../../components/ElementsList/ElementsList';
import { INewVocabulary } from '../../../models/Vocabulary/IVocabulary';
import { NewVocabularyForm } from './components/NewVocabularyForm';
import { TElementPropsWithId } from '../../../components/ElementsList/elementProps';
import { RootState } from '../../../store/store';
import AppBars from '../../../components/AppBars/AppBars';

type TVocabulariesPageProps = {};

const NoVocabularies = () => (
  <Box sx={{ height: '100%', pt: '40%', textAlign: 'center' }}>
    <span>
      No vocabularies found!
    </span>
  </Box>
);

const selectVocabularies = (state: RootState) => state.vocabularies.vocabularies;

const PAGE_NAME = 'Vocabularies';

export const VocabulariesPage: React.FC<TVocabulariesPageProps> = () => {
  const dispatch = useAppDispatch();

  const { ref: fabRef, height: fabHeight } = useHeight();
  const navigate = useNavigate();

  const vocabularies = useAppSelector(selectVocabularies);

  const [isAddFormOpened, setIsAddFormOpened] = useState(false);

  useEffect(() => {
    dispatch(fetchVocabularies());
  }, []);

  const handleFormSubmit = (vocabulary: INewVocabulary) => {
    dispatch(postVocabularies(vocabulary));
  };

  const handleNewVocabularyClicked = () => {
    setIsAddFormOpened(() => true);
  };

  const handleFormClosed = () => {
    setIsAddFormOpened(() => false);
  };

  const getVocabulariesToRender = useMemo<TElementPropsWithId[]>(() => vocabularies.map((d) => (
    {
      primaryText: d.name,
      secondaryText: d.description,
      id: d.id.toString(),
    }
  )), [vocabularies]);

  const handleElementClick = (element: TElementPropsWithId) => {
    const { id } = element;
    navigate(`${id}`);
  };

  const content = vocabularies.length
    ? (
      <ElementsList
        elements={getVocabulariesToRender}
        onElementClick={handleElementClick}
      />
    )
    : <NoVocabularies />;

  return (
    <AppBars.Top title={PAGE_NAME}>
      {content}
      <AddFAB
        color="primary"
        onClick={handleNewVocabularyClicked}
        ref={fabRef}
      />
      <NewVocabularyForm
        isOpened={isAddFormOpened}
        onClose={handleFormClosed}
        onSubmit={handleFormSubmit}
      />
    </AppBars.Top>
  );
};
