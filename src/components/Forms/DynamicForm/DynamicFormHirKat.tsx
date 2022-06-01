import React, { FormEvent, useState } from 'react';
import { Box, Button, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { nanoid } from '@reduxjs/toolkit';
import AddIcon from '@mui/icons-material/Add';
import { SliderDialog } from '../../Dialogs/SliderDialog';
import { INewWord, PartsOfSpeech } from '../../../models/Vocabulary/IWord';
import { OnInputChangeEvent } from '../../../helpers/typeAbbreviations';
import { DynamicNInputs } from './components/DynamicNInputs';
import { ComboBox } from '../../Inputs/ComboBox';

type TDynamicFormHirKatProps = {
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

type TranslateWordInfo = {
  translation: string;
  description: string;
};

type TranslateWord = {
  id: string;
} & TranslateWordInfo;

const translateWordInfo = {
  translation: {
    name: 'translation',
    label: 'Translation',
  },
  description: {
    name: 'description',
    label: 'Description',
  },
};

const partsOfSpeech = Object.entries(PartsOfSpeech).map(([k, v]) => ({
  value: k,
  label: v.charAt(0).toUpperCase() + v.slice(1),
}));

export const DynamicFormHitKat: React.FC<TDynamicFormHirKatProps> = ({
  isOpened,
  onClose,
  formName = '',
  onSubmit,
}) => {
  const [mainWord, setMainWord] = useState('');
  const [translates, setTranslates] = useState<TranslateWord[]>([
    { id: nanoid(), translation: '', description: '' },
  ]);
  const [partOfSpeech, setPartOfSpeech] = useState('');
  const [description, setDescription] = useState('');

  const handleTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    set: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    const { value } = e.target;
    set(value);
  };

  const handleTranslationChange = (e: OnInputChangeEvent, index: number) => {
    const newWord = {
      id: translates[index].id,
      translation: translates[index].translation,
      description: translates[index].description,
    };
    newWord[e.target.name as 'translation' | 'description'] = e.target.value;

    setTranslates([
      ...translates.slice(0, index),
      newWord,
      ...translates.slice(index + 1),
    ]);
  };

  const handleCancelClicked = () => {
    onClose();
  };

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    console.log([mainWord, translates, partOfSpeech, description]);
  };

  const handleAddOnWordClicked = () => {
    setTranslates([
      ...translates,
      { id: nanoid(), translation: '', description: '' },
    ]);
  };

  const handleRemoveOnWordClicked = (index: number) => {
    setTranslates([
      ...translates.slice(0, index),
      ...translates.slice(index + 1),
    ]);
  };

  const handleComboboxChange = (e: SelectChangeEvent) => {
    setPartOfSpeech(e.target.value);
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
          Translates:
        </Typography>
        <Box sx={{ display: 'grid', gap: 3, mb: 4 }}>
          <Box sx={{ display: 'grid', gap: 2 }}>
            <DynamicNInputs<TranslateWordInfo>
              inputsData={translates}
              inputsInfo={translateWordInfo}
              onChange={handleTranslationChange}
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

      <Box sx={{ mb: 4 }}>
        <ComboBox
          id="_partOfSpeech"
          value={partOfSpeech}
          onChange={handleComboboxChange}
          label="Part of Speech"
          items={partsOfSpeech}
          sx={{width: '100%'}}
        />
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
