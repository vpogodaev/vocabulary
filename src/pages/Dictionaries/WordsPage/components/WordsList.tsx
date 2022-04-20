import React, { useMemo } from 'react';
import { IWord } from '../../../../models/Dictionary/IWord';
import { TElementPropsWithId } from '../../../../components/ElementsList/elementProps';
import { ElementsList } from '../../../../components/ElementsList/ElementsList';

type TWordsListProps = {
  words: IWord[];
  onClick: (element: TElementPropsWithId) => void;
};

export const WordsList: React.FC<TWordsListProps> = ({ words, onClick }) => {
  const wordsToRender = useMemo<TElementPropsWithId[]>(() => words.map((w) => (
    {
      primaryText: w.value1,
      secondaryText: w.value2,
      id: w.id.toString(),
    }
  )), [words]);

  return (
    <ElementsList
      elements={wordsToRender}
      onElementClick={onClick}
    />
  );
};
