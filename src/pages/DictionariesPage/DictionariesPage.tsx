import React, { useEffect, useMemo, useState } from 'react';
import { getDictionaries, postDictionary } from '../../services/dictionariesService';
import { AddFAB } from '../../components/AddFAB/AddFAB';
import Form from '../../components/Form/Form';
import { ElementsList } from '../../components/ElementsList/ElementsList';
import { IDictionary, INewDictionary } from '../../models/Dictionary/IDictionary';
import { Box } from '@mui/material';
import { NewDictionaryForm } from './components/NewDictionaryForm';

type TDictionariesPageProps = {};

export const DictionariesPage: React.FC<TDictionariesPageProps> = ({}): JSX.Element => {
  const [dictionaries, setDictionaries] = useState<IDictionary[]>([]);
  const [isAddFormOpened, setIsAddFormOpened] = useState(false);

  const loadDictionaries = () => {
    getDictionaries()
      .then(data => {
        if (data) {
          setDictionaries(data);
        }
      });
  };

  useEffect(() => {
    loadDictionaries();
  }, []);

  const handleFormSubmit = (dictionary: INewDictionary) => {
    console.log(dictionary);
    postDictionary(dictionary).then(r => {
      if (r.ok) {
        return r.json();
      }
    }).then(r => {
      console.log(r);
      setDictionaries((d) => ([...d, r]));
    });
  };

  const handleNewDictionaryClicked = () => {
    setIsAddFormOpened(() => true);
  };

  const handleFormClosed = () => {
    setIsAddFormOpened(() => false);
  };

  const getDictionariesToRender = useMemo(() => dictionaries.map((d) => (
    {
      primaryText: d.name,
      secondaryText: d.description,
      id: d.id.toString(),
    }
  )), [dictionaries]);

  const content = dictionaries.length
    ? <ElementsList elements={getDictionariesToRender} />
    : <NoDictionaries />;

  return (
    <Box>
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