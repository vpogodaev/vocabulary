import React, { useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchDictionaries, postDictionary } from '../../../store/dictionariesSlice';
import { useHeight } from '../../../components/AddFAB/useHeight';

import { AddFAB } from '../../../components/AddFAB/AddFAB';
import { ElementsList } from '../../../components/ElementsList/ElementsList';
import { INewDictionary } from '../../../models/Dictionary/IDictionary';
import { NewDictionaryForm } from './components/NewDictionaryForm';
import { TElementPropsWithId } from '../../../components/ElementsList/elementProps';
import { RootState } from '../../../store/store';
import AppBars from '../../../components/AppBars/AppBars';

type TDictionariesPageProps = {};

const NoDictionaries = () => (
  <Box sx={{ height: '100%', pt: '40%', textAlign: 'center' }}>
    <span>
      No dictionaries found!
    </span>
  </Box>
);

const selectDictionaries = (state: RootState) => state.dictionaries.dictionaries;

const PAGE_NAME = 'Dictionaries';

export const DictionariesPage: React.FC<TDictionariesPageProps> = () => {
  const dispatch = useAppDispatch();

  const { ref: fabRef, height: fabHeight } = useHeight();
  const navigate = useNavigate();

  const dictionaries = useAppSelector(selectDictionaries);

  const [isAddFormOpened, setIsAddFormOpened] = useState(false);

  useEffect(() => {
    dispatch(fetchDictionaries());
  }, []);

  const handleFormSubmit = (dictionary: INewDictionary) => {
    dispatch(postDictionary(dictionary));
  };

  const handleNewDictionaryClicked = () => {
    setIsAddFormOpened(() => true);
  };

  const handleFormClosed = () => {
    setIsAddFormOpened(() => false);
  };

  const getDictionariesToRender = useMemo<TElementPropsWithId[]>(() => dictionaries.map((d) => (
    {
      primaryText: d.name,
      secondaryText: d.description,
      id: d.id.toString(),
    }
  )), [dictionaries]);

  const handleElementClick = (element: TElementPropsWithId) => {
    const { id } = element;
    navigate(`${id}`);
  };

  const content = dictionaries.length
    ? (
      <ElementsList
        elements={getDictionariesToRender}
        onElementClick={handleElementClick}
      />
    )
    : <NoDictionaries />;

  return (
    <AppBars.Top title={PAGE_NAME}>
      {content}
      <AddFAB
        color="primary"
        onClick={handleNewDictionaryClicked}
        ref={fabRef}
      />
      <NewDictionaryForm
        isOpened={isAddFormOpened}
        onClose={handleFormClosed}
        onSubmit={handleFormSubmit}
      />
    </AppBars.Top>
  );
};
