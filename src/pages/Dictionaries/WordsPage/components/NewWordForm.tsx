import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import { SliderDialog } from '../../../../components/SliderDialog/SliderDialog';
import { INewWord } from '../../../../models/Dictionary/IWord';

type TNewWordFormProps = {
  isOpened: boolean;
  onClose: () => void;
  onSubmit: (word: INewWord) => void;
};

const TEXT_NEW_WORD_HEADER = 'New word';
const TEXT_CANCEL_BTN = 'Cancel';
const TEXT_SUBMIT_BTN = 'Submit';

export const NewWordForm: React.FC<TNewWordFormProps> = ({
  isOpened,
  onClose,
  onSubmit,
}) => {
  const [value, setValue] = useState<string>('');

  const handleTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    set: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    set(e.target.value);
  };

  const form = (
    <Box
      component="form"
      id="wordInputForm"
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr',
        gap: 3,
      }}
    >
      <TextField
        // required
        label="かんぎ・おくりがな"
        value={value}
        onChange={(e) => handleTextFieldChange(e, setValue)}
      />
      <TextField
        // required
        label="ひらがな・カタカナ"
        value={value}
        onChange={(e) => handleTextFieldChange(e, setValue)}
      />
    </Box>
  );

  return (
    <SliderDialog
      isOpened={isOpened}
      onCloseClick={onClose}
      title={TEXT_NEW_WORD_HEADER}
      content={form}
      // actions={actions}
    />
  );
};
