import React from 'react';
import { INewWord } from '../../../../../models/Dictionary/IWord';
import { WordForm } from './WordForm';
import { useAppDispatch } from '../../../../../store/hooks';
import { postNewWord } from '../../../../../store/wordsSlice';

type TNewWordFormProps = {
  isOpened: boolean;
  onClose: () => void;
  dictionaryId: number;
};

const TEXT_NEW_WORD_HEADER = 'New word';

export const NewWordForm: React.FC<TNewWordFormProps> = ({
  isOpened,
  onClose,
  dictionaryId,
}) => {
  const dispatch = useAppDispatch();

  const handleSubmitForm = (newWord: INewWord) => {
    newWord.dictionaryId = dictionaryId;

    dispatch(postNewWord(newWord));
    onClose();
  };

  return (
    <WordForm
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmitForm}
      formName={TEXT_NEW_WORD_HEADER}
    />
  );
};
