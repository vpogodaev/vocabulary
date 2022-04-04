import React, { useEffect, useState } from 'react';
import { getDictionaries } from '../../services/dictionariesService';
import { AddFAB } from '../../components/AddFAB/AddFAB';
import Form from '../../components/Form/Form';

type TDictionariesPageProps = {};

export const DictionariesPage: React.FC<TDictionariesPageProps> = ({}): JSX.Element => {
  const [dictionaries, setDictionaries] = useState([]);
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

  const handleFormSubmit = ({...values}) => {
    console.log(values);
  };

  const handleNewDictionaryClicked = () => {
    setIsAddFormOpened(() => true);
  };

  const handleFormClosed = () => {
    setIsAddFormOpened(() => false);
  };



  return (
    <>
      <AddFAB color="primary"
              onClick={handleNewDictionaryClicked} />
      <Form open={isAddFormOpened}
            onClose={handleFormClosed}
            onSubmit={handleFormSubmit} />
    </>
  );
};

const NoDictionaries: React.FC = (): JSX.Element => (<div>No dictionaries found!</div>);