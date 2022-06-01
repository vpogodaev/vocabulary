import { Box, Button, SelectChangeEvent, TextField } from '@mui/material';
import React, { FormEvent, useState } from 'react';
import { SliderDialog } from '../../../../../components/Dialogs/SliderDialog';
import {
  INewWord,
  PartsOfSpeech,
  TWordValue,
} from '../../../../../models/Vocabulary/IWord';
import { ComboBox } from '../../../../../components/Inputs/ComboBox';

type TNewWordFormProps = {
  formName?: string;
  isOpened: boolean;
  onClose: () => void;
  onSubmit: (word: INewWord) => void;
  mainWord?: string;
  secondaryWords?: string;
  translates?: string;
  partOfSpeech?: string;
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

export const WordForm: React.FC<TNewWordFormProps> = ({
  isOpened,
  onClose,
  onSubmit,
  formName = '',
  mainWord = '',
  secondaryWords = '',
  translates = '',
  partOfSpeech = '',
}) => {
  const [_mainWord, setMainWord] = useState<string>(mainWord);
  const [_secondaryWords, setSecondaryWords] = useState<string>(secondaryWords);
  const [_translates, setTranslates] = useState<string>(translates);
  const [_partOfSpeech, setPartOfSpeech] = useState<string>(partOfSpeech);
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

    if (!_mainWord.trim() && !_secondaryWords.trim()) {
      setIsMainSecondaryError(true);
      return;
    }

    setIsMainSecondaryError(false);

    const translates = getWordsArray(_translates);
    if (!translates) {
      setIsTranslateError(true);
      return;
    }
    const newWord: INewWord = {
      mainWord: _mainWord.trim() || undefined,
      secondaryWords: getWordsArray(_secondaryWords),
      translates,
      partOfSpeech: _partOfSpeech as PartsOfSpeech,
    };

    onSubmit(newWord);

    setMainWord(() => '');
    setSecondaryWords(() => '');
    setTranslates(() => '');
    setPartOfSpeech(() => partsOfSpeech[0].value);
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
        value={_mainWord}
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
        value={_secondaryWords}
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
        value={_translates}
        onChange={(e) =>
          handleTextFieldChange(e, setTranslates, setIsTranslateError)
        }
      />
      <ComboBox
        id="_partOfSpeech"
        value={_partOfSpeech}
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
      title={formName}
      content={form}
      actions={actions}
    />
  );
};
