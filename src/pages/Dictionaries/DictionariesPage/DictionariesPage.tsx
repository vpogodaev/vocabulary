import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import {
  AppBar, Box, makeStyles, styled, Toolbar, Typography,
} from '@mui/material';
import { AddFAB } from '../../../components/AddFAB/AddFAB';
import Form from '../../../components/Form/Form';
import { ElementsList } from '../../../components/ElementsList/ElementsList';
import { IDictionary, INewDictionary } from '../../../models/Dictionary/IDictionary';
import { NewDictionaryForm } from './components/NewDictionaryForm';
import { TElementPropsWithId } from '../../../components/ElementsList/elementProps';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchDictionaries, postDictionary } from '../../../store/dictionariesSlice';
import { useHeight } from '../../../components/AddFAB/useHeight';

type TDictionariesPageProps = {};

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const NoDictionaries = () => (
  <Box sx={{ height: '100%', pt: '40%', textAlign: 'center' }}>
    <span>
      No dictionaries found!
    </span>
  </Box>
);

export const DictionariesPage: React.FC<TDictionariesPageProps> = () => {
  const dispatch = useAppDispatch();

  const { ref: fabRef, height: fabHeight } = useHeight();

  const dictionaries = useAppSelector((state) => state.dictionaries.dictionaries);

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
    console.log(element);
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
    <Box sx={{ display: 'flex', flexDirection: 'column' /* height: '100%' */ }}>
      <Box>
        <AppBar position="fixed">
          <Toolbar>
            <Typography
              variant="h6"
              component="h2"
              sx={{ flexGrow: 1 }}
            >
              Words
            </Typography>
          </Toolbar>
        </AppBar>
        <Offset />
      </Box>
      <Box sx={{}}>
        {/* <Box sx={{ height: `100%` }}> */}
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
      </Box>
    </Box>
  );
};
