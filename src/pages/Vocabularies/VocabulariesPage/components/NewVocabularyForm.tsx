import React, { FormEvent, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { SliderDialog } from '../../../../components/SliderDialog/SliderDialog';
import { INewVocabulary } from '../../../../models/Vocabulary/IVocabulary';

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

export const NewVocabularyForm: React.FC<TNewVocabularyFormProps> = ({
  isOpened,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [lang1, setLang1] = useState<string>('');
  const [lang2, setLang2] = useState<string>('');

  const handleTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    set: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    set(e.target.value);
  };

  const handleCancelClicked = () => {
    onClose();
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
      title={TEXT_NEW_VOCABULARY_HEADER}
      content={form}
      actions={actions}
    />
  );
};
