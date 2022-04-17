import React, { useEffect, useMemo, useState } from 'react';
import { AddFAB } from '../../../components/AddFAB/AddFAB';
import Form from '../../../components/Form/Form';
import { ElementsList } from '../../../components/ElementsList/ElementsList';
import { IDictionary, INewDictionary } from '../../../models/Dictionary/IDictionary';
import { Box } from '@mui/material';
import { NewDictionaryForm } from './components/NewDictionaryForm';
import { TElementPropsWithId } from '../../../components/ElementsList/elementProps';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchDictionaries, postDictionary } from '../../../store/dictionariesSlice';

type TDictionariesPageProps = {};

export const DictionariesPage: React.FC<TDictionariesPageProps> = ({}): JSX.Element => {
  const dispatch = useAppDispatch();

  const dictionaries = useAppSelector(state => state.dictionaries.dictionaries);

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
  }

  const content = dictionaries.length
    ? <ElementsList elements={getDictionariesToRender} onElementClick={handleElementClick} />
    : <NoDictionaries />;

  return (
    <Box sx={{height: '100%'}}>
      {content}
      <AddFAB color="primary"
              onClick={handleNewDictionaryClicked} />
      <NewDictionaryForm isOpened={isAddFormOpened}
                         onClose={handleFormClosed}
                         onSubmit={handleFormSubmit} />
    </Box>
  );
};

const NoDictionaries: React.FC = (): JSX.Element => (
  <Box sx={{height: '100vh', pt: '40%', textAlign: 'center'}}>
    <span>
      No dictionaries found!
    </span>
  </Box>
);