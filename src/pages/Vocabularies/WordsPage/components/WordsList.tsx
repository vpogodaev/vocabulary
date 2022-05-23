import React, { useMemo } from 'react';
import { IWord } from '../../../../models/Vocabulary/IWord';
import { TElementPropsWithId } from '../../../../components/ElementsList/elementProps';
import { ElementsList } from '../../../../components/ElementsList/ElementsList';

type TWordsListProps = {
  words: IWord[];
  onClick?: (element: TElementPropsWithId) => void;
};

export const WordsList: React.FC<TWordsListProps> = ({ words, onClick }) => {
  const wordsToRender = useMemo<TElementPropsWithId[]>(
    () =>
      words.map((w) => {
        // const primaryText = w.mainWord || w.secondaryWords?.[0] || '';
        // const secondaryText = w.translate?.find((t) => t.isMain)?.value || w.translate?.[0].value || '';

        const primaryText = w.mainWord || '';
        const secondaryText =
          w.translates?.find((t) => t.isMain)?.value ||
          w.translates?.[0].value ||
          '';

        return {
          primaryText,
          secondaryText,
          id: w.id.toString(),
        };
      }),
    [words],
  );

  return (
    <ElementsList
      elements={wordsToRender}
      onElementClick={onClick}
    />
  );
};
