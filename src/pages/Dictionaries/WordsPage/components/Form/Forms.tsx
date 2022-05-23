import React, { useEffect, useState } from 'react';
import { IWord } from '../../../../../models/Dictionary/IWord';
import { NewWordForm } from './NewWordForm';
import { EditWordForm } from './EditWordForm';

export enum FormState {
  CLOSED,
  NEW,
  EDIT,
}

type TFormProps = {
  state: FormState;
  wordToEdit: IWord | null;
  onClose: () => void;
  dictionaryId: number;
};

export const Forms: React.FC<TFormProps> = ({
  state,
  wordToEdit = null,
  onClose,
  dictionaryId,
}) => {
  const form = {
    [FormState.NEW]: (
      <NewWordForm
        isOpened={state === FormState.NEW}
        onClose={onClose}
        dictionaryId={dictionaryId}
      />
    ),
    [FormState.EDIT]: (
      <EditWordForm
        isOpened={state === FormState.EDIT}
        onClose={onClose}
        oldWord={wordToEdit as IWord}
      />
    ),
    [FormState.CLOSED]: null,
  };

  return form[state];
};
