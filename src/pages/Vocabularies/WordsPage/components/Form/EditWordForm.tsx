import React from 'react';
import { WordForm } from './WordForm';
import {
  INewWord,
  IWord,
  TWordValue,
} from '../../../../../models/Vocabulary/IWord';
import { useAppDispatch } from '../../../../../store/hooks';
import { editOldWord } from '../../../../../store/wordsSlice';

type TEditWordFormProps = {
  isOpened: boolean;
  onClose: () => void;
  oldWord: IWord;
};

const TEXT_EDIT_WORD_HEADER = 'Edit word';

const wordsToString = (words?: TWordValue[]) =>
  words && words.length
    ? words
        .slice()
        .sort((w1, w2) => {
          if (w1.isMain) {
            return -1;
          }
          if (w2.isMain) {
            return 1;
          }

          if (w1.value < w2.value) {
            return 1;
          }
          if (w1.value > w2.value) {
            return -1;
          }
          return 0;
        })
        .map((w) => w.value)
        .join('\n')
    : '';

export const EditWordForm: React.FC<TEditWordFormProps> = ({
  isOpened,
  onClose,
  oldWord,
}) => {
  const dispatch = useAppDispatch();

  const { mainWord, secondaryWords, translates, partOfSpeech, vocabularyId } =
    oldWord;

  const handleSubmitForm = (newWord: INewWord) => {
    const word: IWord = { ...newWord, id: oldWord.id, vocabularyId: vocabularyId };

    dispatch(editOldWord(word));
    onClose();
  };

  return (
    <WordForm
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmitForm}
      formName={TEXT_EDIT_WORD_HEADER}
      mainWord={mainWord}
      secondaryWords={wordsToString(secondaryWords)}
      translates={wordsToString(translates)}
      partOfSpeech={partOfSpeech}
    />
  );
};
