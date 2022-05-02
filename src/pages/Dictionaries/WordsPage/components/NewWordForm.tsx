import { Box, Button, SelectChangeEvent, TextField } from '@mui/material';
import React, { FormEvent, useState } from 'react';
import { SliderDialog } from '../../../../components/SliderDialog/SliderDialog';
import {
  INewWord,
  PartsOfSpeech,
  TWordValue,
} from '../../../../models/Dictionary/IWord';
import { ComboBox } from '../../../../components/Inputs/ComboBox';

type TNewWordFormProps = {
  isOpened: boolean;
  onClose: () => void;
  onSubmit: (word: INewWord) => void;
};

const TEXT_NEW_WORD_HEADER = 'New word';
const TEXT_MAIN_VALUE = 'Main value';
const TEXT_MAIN_VALUE_ERROR = 'Set either Main value or Secondary value(s)';
const TEXT_SECONDARY_VALUE = 'Secondary value(s)';
const TEXT_SECONDARY_VALUE_HELPER =
  'Enter one or several values on different lines';
const TEXT_SECONDARY_VALUE_ERROR =
  'Set either Main value or Secondary value(s)';
const TEXT_TRANSLATE = 'Translate(s)';
const TEXT_TRANSLATE_HELPER =
  'Enter one or several translates on different lines';
const TEXT_TRANSLATE_ERROR = 'Enter at least one translate';
const TEXT_CANCEL_BTN = 'Cancel';
const TEXT_SUBMIT_BTN = 'Submit';

// TODO: tmp
const partsOfSpeech = Object.entries(PartsOfSpeech).map(([k, v]) => ({
  value: k,
  label: v.charAt(0).toUpperCase() + v.slice(1),
}));

const getWordsArray = (wordsString: string): TWordValue[] | undefined => {
  const wordsArray =
    wordsString
      .trim()
      ?.split('\n')
      .filter((w) => w.length)
      .map((w) => ({ value: w, isMain: false })) || undefined;
  if (wordsArray && wordsArray.length) {
    wordsArray[0].isMain = true;
  }

  return wordsArray;
};

export const NewWordForm: React.FC<TNewWordFormProps> = ({
  isOpened,
  onClose,
  onSubmit,
}) => {
  const [mainWord, setMainWord] = useState<string>('');
  const [secondaryWords, setSecondaryWords] = useState<string>('');
  const [translates, setTranslates] = useState<string>('');
  const [partOfSpeech, setPartOfSpeech] = useState<string>(
    partsOfSpeech[0].value,
  );
  const [isMainSecondaryError, setIsMainSecondaryError] =
    useState<boolean>(false);
  const [isTranslateError, setIsTranslateError] = useState<boolean>(false);

  const handleTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    set: React.Dispatch<React.SetStateAction<string>>,
    setRemoveEmptyError?: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    const { value } = e.target;
    set(value);

    if (setRemoveEmptyError && value.trim()) {
      setRemoveEmptyError(false);
    }
  };

  const handleComboboxChange = (e: SelectChangeEvent) => {
    setPartOfSpeech(e.target.value);
  };

  const handleCancelClicked = () => {
    onClose();
  };

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    if (!mainWord.trim() && !secondaryWords.trim()) {
      setIsMainSecondaryError(true);
      return;
    }

    setIsMainSecondaryError(false);

    const _translates = getWordsArray(translates);
    if (!_translates) {
      setIsTranslateError(true);
      return;
    }
    const newWord: INewWord = {
      mainWord: mainWord.trim() || undefined,
      secondaryWords: getWordsArray(secondaryWords),
      translates: _translates,
      partOfSpeech: partOfSpeech as PartsOfSpeech,
    };

    onSubmit(newWord);

    setMainWord(() => '');
    setSecondaryWords(() => '');
    setTranslates(() => '');
    setPartOfSpeech(() => partsOfSpeech[0].value);

    onClose();
  };

  const form = (
    <Box
      component="form"
      onSubmit={handleSubmitForm}
      id="wordInputForm"
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr',
        gap: 3,
      }}
    >
      <TextField
        sx={{ width: '100%' }}
        label={TEXT_MAIN_VALUE}
        value={mainWord}
        onChange={(e) =>
          handleTextFieldChange(e, setMainWord, setIsMainSecondaryError)
        }
        error={isMainSecondaryError}
        helperText={isMainSecondaryError && TEXT_MAIN_VALUE_ERROR}
      />
      <TextField
        sx={{ width: '100%' }}
        label={TEXT_SECONDARY_VALUE}
        error={isMainSecondaryError}
        helperText={
          isMainSecondaryError
            ? TEXT_SECONDARY_VALUE_ERROR
            : TEXT_SECONDARY_VALUE_HELPER
        }
        multiline
        value={secondaryWords}
        onChange={(e) =>
          handleTextFieldChange(e, setSecondaryWords, setIsMainSecondaryError)
        }
      />
      <TextField
        sx={{ width: '100%' }}
        label={TEXT_TRANSLATE}
        error={isTranslateError}
        helperText={
          isTranslateError ? TEXT_TRANSLATE_ERROR : TEXT_TRANSLATE_HELPER
        }
        multiline
        required
        value={translates}
        onChange={(e) =>
          handleTextFieldChange(e, setTranslates, setIsTranslateError)
        }
      />
      <ComboBox
        id="partOfSpeech"
        value={partOfSpeech}
        onChange={handleComboboxChange}
        label="Part of Speech"
        items={partsOfSpeech}
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
      title={TEXT_NEW_WORD_HEADER}
      content={form}
      actions={actions}
    />
  );
};
