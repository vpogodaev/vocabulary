import React, { useEffect, useState } from 'react';
import { IWord } from '../../../../../models/Vocabulary/IWord';
import { NewWordForm } from './NewWordForm';
import { EditWordForm } from './EditWordForm';
import { DynamicFormKanji } from '../../../../../components/Forms/DynamicForm/DynamicFormKanji';
import { DynamicFormKana } from '../../../../../components/Forms/DynamicForm/DynamicFormKana';
import { DynamicForm } from '../../../../../components/Forms/DynamicForm/DynamicForm';
import { SliderDialog } from '../../../../../components/Dialogs/SliderDialog';

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
      content={<DynamicForm onSubmit={() => console.log('onSubmit')} />}
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
