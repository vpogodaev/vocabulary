import React, { useEffect, useState } from 'react';
import { IWord } from '../../../../../models/Vocabulary/IWord';
import { NewWordForm } from './NewWordForm';
import { EditWordForm } from './EditWordForm';
import { DynamicForm } from '../../../../../components/Forms/DynamicForm/DynamicForm';
import { DynamicFormHitKat } from '../../../../../components/Forms/DynamicForm/DynamicFormHirKat';

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
}) => (
  <>
    {/*<DynamicForm*/}
    {/*  isOpened={state === FormState.NEW}*/}
    {/*  onClose={onClose}*/}
    {/*  onSubmit={(e: any) => console.log('onSubmit', e)}*/}
    {/*/>*/}
    <DynamicFormHitKat
      isOpened={state === FormState.NEW}
      onClose={onClose}
      onSubmit={(e: any) => console.log('onSubmit', e)}
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
