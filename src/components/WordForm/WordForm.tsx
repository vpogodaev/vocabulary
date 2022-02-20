import { Box, TextField } from '@mui/material';
import React, { FormEvent, useState } from 'react';

import styles from './WordForm.module.scss';
import Form from '../Form/Form';

declare type TWordFormProps = {
  onFormSubmit: (flv: string, slv: string) => void;
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
            onClose={handleClose} />
    </div>
  );

  // const [value1, setValue1] = useState('');
  // const [value2, setValue2] = useState('');
  //
  // const handleSubmitForm = (e: FormEvent) => {
  //   e.preventDefault();
  //
  //   onFormSubmit(value1, value2);
  //
  //   setValue1('');
  //   setValue2('');
  // };
  //
  // const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, set: React.Dispatch<React.SetStateAction<string>>) => {
  //   set(e.target.value);
  // };
  //
  // return (
  //   <Box component="form" onSubmit={handleSubmitForm}>
  //     <TextField required label="Word" onChange={e => handleTextFieldChange(e, setValue1)}/>
  //     <TextField required label="Translation" onChange={e => handleTextFieldChange(e, setValue2)}/>
  //     <button type="submit">Добавить</button>
  //   </Box>
  // );
};

export default WordForm;