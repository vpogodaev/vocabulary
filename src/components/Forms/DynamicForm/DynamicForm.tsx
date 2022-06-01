import React, { FormEvent, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { nanoid } from '@reduxjs/toolkit';
import AddIcon from '@mui/icons-material/Add';
import { SliderDialog } from '../../Dialogs/SliderDialog';
import { INewWord } from '../../../models/Vocabulary/IWord';
import { OnInputChangeEvent } from '../../../helpers/typeAbbreviations';
import { DynamicNInputs } from './components/DynamicNInputs';

type TDynamicFormProps = {
  formName?: string;
  isOpened: boolean;
  onClose: () => void;
  onSubmit: (word: INewWord) => void;
};

const TEXT_MAIN_VALUE = 'Main value';
const TEXT_MAIN_VALUE_ERROR = 'Set either Main value or Secondary value(s)';
const TEXT_SECONDARY_VALUE = 'Secondary value(s)';
const TEXT_SECONDARY_VALUE_HELPER =
  'Enter one or several values on different lines';
const TEXT_SECONDARY_VALUE_ERROR =
  'Set either Main value or Secondary value(s)';
const TEXT_TRANSLATE = 'Translate(s)';
const TEXT_TRANSLATE_HELPER =
  'Enter one or several _translates on different lines';
const TEXT_TRANSLATE_ERROR = 'Enter at least one translate';
const TEXT_CANCEL_BTN = 'Cancel';
const TEXT_SUBMIT_BTN = 'Submit';

type OnKunWord = {
  id: string;
  word: string;
  translation: string;
  description: string;
};

export const DynamicForm: React.FC<TDynamicFormProps> = ({
  isOpened,
  onClose,
  formName = '',
  onSubmit,
}) => {
  const [mainWord, setMainWord] = useState('');
  const [onWords, setOnWords] = useState<OnKunWord[]>([
    { id: nanoid(), word: '', translation: '', description: '' },
  ]);
  const [kunWords, setKunWords] = useState<OnKunWord[]>([
    { id: nanoid(), word: '', translation: '', description: '' },
  ]);
  const [description, setDescription] = useState('');

  const handleTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    set: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    const { value } = e.target;
    set(value);
  };

  const handleOnChange = (e: OnInputChangeEvent, index: number) => {
    const newWord = {
      id: onWords[index].id,
      word: onWords[index].word,
      translation: onWords[index].translation,
      description: onWords[index].description,
    };
    newWord[e.target.name as 'word' | 'translation' | 'description'] =
      e.target.value;

    setOnWords([
      ...onWords.slice(0, index),
      newWord,
      ...onWords.slice(index + 1),
    ]);
  };

  const handleKunChange = (e: OnInputChangeEvent, index: number) => {
    const newWord = {
      id: kunWords[index].id,
      word: kunWords[index].word,
      translation: kunWords[index].translation,
      description: kunWords[index].description,
    };
    newWord[e.target.name as 'word' | 'translation' | 'description'] =
      e.target.value;

    setKunWords([
      ...kunWords.slice(0, index),
      newWord,
      ...kunWords.slice(index + 1),
    ]);
  };

  const handleCancelClicked = () => {
    onClose();
  };

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleAddOnWordClicked = () => {
    setOnWords([
      ...onWords,
      { id: nanoid(), word: '', translation: '', description: '' },
    ]);
  };

  const handleRemoveOnWordClicked = (index: number) => {
    setOnWords([...onWords.slice(0, index), ...onWords.slice(index + 1)]);
  };

  const handleAddKunWordClicked = () => {
    setKunWords([
      ...kunWords,
      { id: nanoid(), word: '', translation: '', description: '' },
    ]);
  };

  const handleRemoveKunWordClicked = (index: number) => {
    setKunWords([...kunWords.slice(0, index), ...kunWords.slice(index + 1)]);
  };

  const form = (
    <Box
      component="form"
      onSubmit={handleSubmitForm}
      id="wordInputForm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ mb: 5 }}>
        <TextField
          sx={{ width: '100%' }}
          label={TEXT_MAIN_VALUE}
          value={mainWord}
          onChange={(e) => handleTextFieldChange(e, setMainWord)}
        />
      </Box>
      <Box>
        <Typography
          variant="subtitle1"
          component="h3"
          sx={{ mb: 1 }}
        >
          On:
        </Typography>
        <Box sx={{ display: 'grid', gap: 3, mb: 4 }}>
          <Box sx={{ display: 'grid', gap: 2 }}>
            <DynamicNInputs
              inputInfos={onWords}
              onChange={handleOnChange}
              onRemoveClicked={handleRemoveOnWordClicked}
            />
          </Box>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddOnWordClicked}
          >
            Add
          </Button>
        </Box>
      </Box>

      <Box>
        <Typography
          variant="subtitle1"
          component="h3"
          sx={{ mb: 1 }}
        >
          Kun:
        </Typography>
        <Box sx={{ display: 'grid', gap: 3, mb: 4 }}>
          <Box sx={{ display: 'grid', gap: 2 }}>
            <DynamicNInputs
              inputInfos={kunWords}
              onChange={handleKunChange}
              onRemoveClicked={handleRemoveKunWordClicked}
            />
          </Box>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddKunWordClicked}
          >
            Add
          </Button>
        </Box>
      </Box>

      <Box>
        <TextField
          sx={{ width: '100%' }}
          label={'Description'}
          multiline
          value={description}
          onChange={(e) => handleTextFieldChange(e, setDescription)}
        />
      </Box>
    </Box>
  );

  const actions = (
    <>
      <Button onClick={handleCancelClicked}>{TEXT_CANCEL_BTN}</Button>
      <Button
        type="submit"
        form="wordInputForm"
      >
        {TEXT_SUBMIT_BTN}
      </Button>
    </>
  );

  return (
    <SliderDialog
      isOpened={isOpened}
      onCloseClick={onClose}
      // title={formName}
      title={'New word'}
      content={form}
      actions={actions}
    />
  );
};
