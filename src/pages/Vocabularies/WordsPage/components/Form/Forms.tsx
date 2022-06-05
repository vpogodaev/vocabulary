import React, { useEffect, useState } from 'react';
import { IWord, PartsOfSpeech } from '../../../../../models/Vocabulary/IWord';
import { NewWordForm } from './NewWordForm';
import { EditWordForm } from './EditWordForm';
import { DynamicFormKanji } from '../../../../../components/Forms/DynamicForm/DynamicFormKanji';
import { DynamicFormKana } from '../../../../../components/Forms/DynamicForm/DynamicFormKana';
import {
  DynamicForm,
  FormSubmitResult,
} from '../../../../../components/Forms/DynamicForm/DynamicForm';
import { SliderDialog } from '../../../../../components/Dialogs/SliderDialog';
import { exampleMetaData } from '../../../../../components/Forms/DynamicForm/services/metadataFactory';
import {
  getComboBoxProps,
  getNInputsProps,
  getTextAreaProps,
  getTextBoxProps,
} from '../../../../../components/Forms/DynamicForm/services/dynamicFormPropsFactory';
import { Button } from '@mui/material';

export enum FormState {
  CLOSED,
  NEW,
  EDIT,
}

type TFormProps = {
  state: FormState;
  wordToEdit: IWord | null;
  onClose: () => void;
  vocabularyId: number;
};

export const Forms: React.FC<TFormProps> = ({
  state,
  wordToEdit,
  onClose,
  vocabularyId,
}) => {
  const textBoxProps = getTextBoxProps({
    id: 'kanjiInput',
    name: 'kanji',
    label: 'Kanji',
    initValue: 'Test',
  });
  const textBox2Props = getTextBoxProps({
    id: 'kanjiInput2',
    name: 'kanji',
    label: 'Kanji',
    initValue: 'Test',
  });
  const textAreaProps = getTextAreaProps({
    id: 'kanjiTextArea',
    name: 'kanji',
    label: 'Kanji',
    initValue: 'Test',
  });
  const comboBoxProps = getComboBoxProps({
    id: 'partOfSpeechComboBox',
    name: 'partOfSpeech',
    label: 'Part Of Speech',
    items: Object.entries(PartsOfSpeech).map(([k, v]) => ({
      value: k,
      label: v.charAt(0).toUpperCase() + v.slice(1),
    })),
    initValue: 'noun',
  });
  const nInputsProps = getNInputsProps({
    id: 'onWordsNInputs',
    name: 'onWords',
    label: 'On:',
    items: {
      word: {
        name: 'word',
        label: 'Word',
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
    initValue: [
      {
        word: 'test',
      },
      {
        word: 'test2',
        description: 'test212',
      },
    ],
  });

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

  const handleFormSubmit = (result: FormSubmitResult) => {
    console.log('handleFormSubmit', result);
  };

  return (
    <>
      {/*<DynamicFormKanji*/}
      {/*  isOpened={state === FormState.NEW}*/}
      {/*  onClose={onClose}*/}
      {/*  onSubmit={(e: any) => console.log('onSubmit', e)}*/}
      {/*/>*/}
      {/*<DynamicFormHitKat*/}
      {/*  isOpened={state === FormState.NEW}*/}
      {/*  onClose={onClose}*/}
      {/*  onSubmit={(e: any) => console.log('onSubmit', e)}*/}
      {/*/>*/}

      <SliderDialog
        isOpened={state === FormState.NEW}
        onCloseClick={onClose}
        // title={formName}
        title="Dynamic form"
        // todo: metadata functions should be in useCallback or use constant (check what is better)
        content={
          <DynamicForm
            onSubmit={handleFormSubmit}
            metaData={[
              textBoxProps.metadata,
              textBox2Props.metadata,
              textAreaProps.metadata,
              comboBoxProps.metadata,
              nInputsProps.metadata,
            ]}
            initValues={[
              textBoxProps.initValue,
              textBox2Props.initValue,
              textAreaProps.initValue,
              comboBoxProps.initValue,
              nInputsProps.initValue,
            ]}
          />
        }
        actions={actions}
      />

      {/*<NewWordForm*/}
      {/*  isOpened={state === FormState.NEW}*/}
      {/*  onClose={onClose}*/}
      {/*  vocabularyId={vocabularyId}*/}
      {/*/>*/}
      <EditWordForm
        isOpened={state === FormState.EDIT}
        onClose={onClose}
        oldWord={(wordToEdit ?? {}) as IWord}
      />
    </>
  );
};
