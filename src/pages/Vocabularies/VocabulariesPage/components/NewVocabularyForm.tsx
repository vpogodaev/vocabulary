import React, { FormEvent, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { SliderDialog } from '../../../../components/Dialogs/SliderDialog';
import { INewVocabulary } from '../../../../models/Vocabulary/IVocabulary';
import { VocabularyBaseLanguage } from '../../../../models/Vocabulary/Language';

type TNewVocabularyFormProps = {
  isOpened: boolean;
  onClose: () => void;
  onSubmit: (vocabulary: INewVocabulary) => void;
};

const TEXT_NEW_VOCABULARY_HEADER = 'New vocabularies';
const TEXT_CANCEL_BTN = 'Cancel';
const TEXT_SUBMIT_BTN = 'Submit';
const TEXT_NAME_LABEL = 'Name';
const TEXT_LANG1_LABEL = 'First Language';
const TEXT_LANG2_LABEL = 'Second Language';
const TEXT_DESCRIPTION_LABEL = 'Description';
const TEXT_BASE_LANGUAGE = 'Language Base';
const TEXT_ENGLISH = 'English';
const TEXT_JAPANESE = 'Japanese';

const SelectLanguage = ({
  baseLang,
  onChange,
}: {
  baseLang: VocabularyBaseLanguage;
  onChange: (lang: SelectChangeEvent<VocabularyBaseLanguage>) => void;
}) => (
  <FormControl>
    <InputLabel id="lang-base-label">{TEXT_BASE_LANGUAGE}</InputLabel>
    <Select
      labelId="lang-base-label"
      id="lang-base"
      value={baseLang}
      label={TEXT_BASE_LANGUAGE}
      onChange={onChange}
    >
      <MenuItem value={VocabularyBaseLanguage.en}>{TEXT_ENGLISH}</MenuItem>
      <MenuItem value={VocabularyBaseLanguage.jp}>{TEXT_JAPANESE}</MenuItem>
    </Select>
  </FormControl>
);

export const NewVocabularyForm: React.FC<TNewVocabularyFormProps> = ({
  isOpened,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [lang1, setLang1] = useState<string>('');
  const [lang2, setLang2] = useState<string>('');
  const [baseLanguage, setBaseLanguage] = useState<VocabularyBaseLanguage>(
    VocabularyBaseLanguage.jp,
  );

  const handleTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    set: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    set(e.target.value);
  };

  const handleCancelClicked = () => {
    onClose();
  };

  const handleLanguageChanged = (
    e: SelectChangeEvent<VocabularyBaseLanguage>,
  ) => {
    setBaseLanguage(e.target.value as VocabularyBaseLanguage);
  };

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    if (!name || !lang1 || !lang2) {
      return;
    }

    onSubmit({
      name,
      description: description || undefined,
      lang1,
      lang2,
      baseLanguage,
    });

    setName(() => '');
    setDescription(() => '');
    setLang1(() => '');
    setLang2(() => '');

    onClose();
  };

  const form = (
    <Box
      component="form"
      onSubmit={handleSubmitForm}
      id="vocabularyInputForm"
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr',
        gap: 3,
      }}
    >
      <SelectLanguage
        baseLang={baseLanguage}
        onChange={handleLanguageChanged}
      />
      <TextField
        required
        label={TEXT_NAME_LABEL}
        value={name}
        onChange={(e) => handleTextFieldChange(e, setName)}
      />
      <TextField
        required
        label={TEXT_LANG1_LABEL}
        value={lang1}
        onChange={(e) => handleTextFieldChange(e, setLang1)}
      />
      <TextField
        required
        label={TEXT_LANG2_LABEL}
        value={lang2}
        onChange={(e) => handleTextFieldChange(e, setLang2)}
      />
      <TextField
        label={TEXT_DESCRIPTION_LABEL}
        value={description}
        onChange={(e) => handleTextFieldChange(e, setDescription)}
      />
    </Box>
  );

  const actions = (
    <>
      <Button onClick={handleCancelClicked}>{TEXT_CANCEL_BTN}</Button>
      <Button
        type="submit"
        form="vocabularyInputForm"
      >
        {TEXT_SUBMIT_BTN}
      </Button>
    </>
  );

  return (
    <SliderDialog
      isOpened={isOpened}
      onCloseClick={onClose}
      title={TEXT_NEW_VOCABULARY_HEADER}
      content={form}
      actions={actions}
    />
  );
};
