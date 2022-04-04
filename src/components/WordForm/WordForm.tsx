import React, { FormEvent, useState } from 'react';

import { INewWord } from '../../models/interfaces/interfaces';

import Form from '../Form/Form';

import styles from './WordForm.module.scss';

declare type TWordFormProps = {
  onFormSubmit: (word: INewWord) => void;
};

const WordForm: React.FC<TWordFormProps> = ({onFormSubmit}): JSX.Element => {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    setOpened(true);
  };
  const handleClose = () => {
    setOpened(false);
  };

  return (
    <div>
      <button onClick={handleOpen}>open</button>
      <Form open={opened}
            onClose={handleClose}
            onSubmit={onFormSubmit} />
    </div>
  );
};

export default WordForm;