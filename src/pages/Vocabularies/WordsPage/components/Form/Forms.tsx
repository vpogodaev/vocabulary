import React, { useEffect, useState } from 'react';
import { IWord } from '../../../../../models/Vocabulary/IWord';
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
  vocabularyId: number;
};

export const Forms: React.FC<TFormProps> = ({
  state,
  wordToEdit = null,
  onClose,
  vocabularyId,
}) => {
  const form = {
    [FormState.NEW]: (
      <NewWordForm
        isOpened={state === FormState.NEW}
        onClose={onClose}
        vocabularyId={vocabularyId}
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
