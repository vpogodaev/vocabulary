import React, { useEffect, useMemo, useState } from 'react';
import { Button, SelectChangeEvent } from '@mui/material';
import { PartsOfSpeech } from '../../../../../models/Vocabulary/IWord';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import {
  DynamicForm,
  FormSubmitResult,
} from '../../../../../components/Forms/DynamicForm/DynamicForm';
import { SliderDialog } from '../../../../../components/Dialogs/SliderDialog';
import { VocabularyBaseLanguage } from '../../../../../models/Vocabulary/Language';
import {
  getWordTypeLabel,
  getWordTypes,
} from '../../../../../services/wordsService';
import { ComboBox } from '../../../../../components/Inputs/ComboBox';
import { WordType } from '../../../../../models/Word/Word';
import { selectCurrentVocabulary } from '../../../../../store/vocabulariesSlice';
import {
  getComboBoxProps,
  getNInputsProps,
  getTextAreaProps,
  getTextBoxProps,
} from '../../../../../components/Forms/DynamicForm/services/dynamicFormPropsFactory';
import { getComboBoxMD } from '../../../../../components/Forms/DynamicForm/services/metadataFactory';
import {
  Metadata,
  NInputsMetadata,
} from '../../../../../components/Forms/DynamicForm/services/metadataTypes';
import { KeysWithStringValues } from '../../../../../helpers/typeAbbreviations';

type TCreateWordFormProps = {
  isOpened: boolean;
  onClose: () => void;
};

const TEXT_NEW_WORD_HEADER = 'New word: ';

type TWordTypeComboBoxProps = {
  lang?: VocabularyBaseLanguage;
  type?: WordType;
  onChange: (newType: WordType) => void;
};
const WordTypeComboBox: React.FC<TWordTypeComboBoxProps> = ({
  lang,
  type,
  onChange,
}) => {
  if (!lang || !type) {
    return null;
  }

  const [types] = useState(getWordTypes(lang));

  if (!types.length) {
    return null;
  }

  const items = useMemo(
    () => types.map((t) => ({ value: t, label: getWordTypeLabel(t) })),
    [types],
  );

  const handleWordChanged = (event: SelectChangeEvent) => {
    onChange(event.target.value as WordType);
  };

  return (
    <ComboBox
      sx={{mb: 2, width: '100%'}}
      id="wordType"
      label="Choose Word type"
      value={type}
      onChange={handleWordChanged}
      items={items}
      noneAvailable={false}
    />
  );
};

const getGenericFormProps = (wordType?: WordType) => {
  const result: {
    metadata: (Metadata | NInputsMetadata)[];
    initValues: (string | KeysWithStringValues[] | undefined)[];
  } = {
    metadata: [],
    initValues: [],
  };

  switch (wordType) {
    case WordType.jpKanji: {
      const textBoxProps = getTextBoxProps({
        id: 'kanjiWord',
        name: 'kanji',
        label: 'Kanji',
        required: true,
      });
      const textAreaProps = getTextAreaProps({
        id: 'descriptionTextArea',
        name: 'description',
        label: 'Description',
      });
      const onProps = getNInputsProps({
        id: 'onWordsNInputs',
        name: 'onWords',
        label: 'On:',
        items: {
          word: {
            name: 'word',
            label: 'Word',
            required: true,
          },
          translation: {
            name: 'translation',
            label: 'Translation',
          },
          description: {
            name: 'description',
            label: 'Description',
          },
        },
      });
      const kunProps = getNInputsProps({
        id: 'kunWordsNInputs',
        name: 'kunWords',
        label: 'Kun:',
        items: {
          word: {
            name: 'word',
            label: 'Word',
            required: true,
          },
          translation: {
            name: 'translation',
            label: 'Translation',
          },
          description: {
            name: 'description',
            label: 'Description',
          },
        },
      });

      [textBoxProps, textAreaProps, onProps, kunProps].forEach((item) => {
        result.metadata.push(item.metadata);
        result.initValues.push(item.initValue);
      });
      break;
    }
    case WordType.jpKana: {
      const textBoxProps = getTextBoxProps({
        id: 'kanaWord',
        name: 'Kana',
        label: 'Kana',
        required: true,
      });
      const translatesProps = getNInputsProps({
        id: 'kanaTranslatesNInputs',
        name: 'kunWords',
        items: {
          translation: {
            name: 'translation',
            label: 'Translation',
          },
          description: {
            name: 'description',
            label: 'Description',
          },
        },
      });
      const textAreaProps = getTextAreaProps({
        id: 'descriptionTextArea',
        name: 'description',
        label: 'Description',
      });
      const comboBoxProps = getComboBoxProps({
        id: 'partOfSpeechComboBox',
        name: 'partOfSpeech',
        label: 'Part Of Speech',
        items: Object.entries(PartsOfSpeech).map(([k, v]) => ({
          value: k,
          label: v.charAt(0).toUpperCase() + v.slice(1),
        })),
        noneAvailable: true,
      });
      [textBoxProps, translatesProps, textAreaProps, comboBoxProps].forEach(
        (item) => {
          result.metadata.push(item.metadata);
          result.initValues.push(item.initValue);
        },
      );
      break;
    }
    case WordType.jpJukungoOkurigana: {
      const mainValueProps = getTextBoxProps({
        id: 'jukungoOkuriganaTextBox',
        name: 'jukungoOkurigana',
        label: 'Jukungo / Okurigana',
        required: true,
      });
      const readingProps = getTextBoxProps({
        id: 'readingTextBox',
        name: 'reading',
        label: 'Reading',
      });
      const translatesProps = getNInputsProps({
        id: 'jukungoOkuriganaTranslatesNInputs',
        name: 'jukungoOkurigana',
        items: {
          translation: {
            name: 'translation',
            label: 'Translation',
          },
          description: {
            name: 'description',
            label: 'Description',
          },
        },
      });
      const textAreaProps = getTextAreaProps({
        id: 'descriptionTextArea',
        name: 'description',
        label: 'Description',
      });
      const comboBoxProps = getComboBoxProps({
        id: 'partOfSpeechComboBox',
        name: 'partOfSpeech',
        label: 'Part Of Speech',
        items: Object.entries(PartsOfSpeech).map(([k, v]) => ({
          value: k,
          label: v.charAt(0).toUpperCase() + v.slice(1),
        })),
        noneAvailable: true,
      });
      [
        mainValueProps,
        readingProps,
        translatesProps,
        textAreaProps,
        comboBoxProps,
      ].forEach((item) => {
        result.metadata.push(item.metadata);
        result.initValues.push(item.initValue);
      });
      break;
    }
    default:
      return result;
  }

  return result;
};

export const CreateWordForm: React.FC<TCreateWordFormProps> = ({
  isOpened,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const vocabulary = useAppSelector(selectCurrentVocabulary);

  const [wordType, setWordType] = useState<WordType | undefined>();

  const metadata = getGenericFormProps(wordType);
  console.log(metadata);

  useEffect(() => {
    if (vocabulary?.baseLanguage) {
      setWordType(getWordTypes(vocabulary?.baseLanguage)[0]);
    }
  }, [vocabulary?.baseLanguage]);

  const handleSubmitForm = (result: FormSubmitResult) => {
    console.log(result);

    //dispatch(postNewWord(newWord));
    onClose();
  };

  const actions = (
    <>
      <Button onClick={onClose}>Cancel</Button>
      <Button
        type="submit"
        form="wordInputForm"
      >
        Create
      </Button>
    </>
  );

  return (
    <SliderDialog
      isOpened={isOpened}
      onCloseClick={onClose}
      title={TEXT_NEW_WORD_HEADER}
      content={
        <>
          <WordTypeComboBox
            lang={vocabulary?.baseLanguage}
            type={wordType}
            onChange={(e) => {
              setWordType(e);
            }}
          />
          <DynamicForm
            onSubmit={handleSubmitForm}
            metaData={metadata.metadata}
            initValues={metadata.initValues}
          />
        </>
      }
      actions={actions}
    />
  );
};
