import React from 'react';
import { OnInputChangeEvent } from '../../../../helpers/typeAbbreviations';
import { NInputsBox } from './NInputsBox';

type TDynamicNInputsProps = {
  // inputInfos: [{ id: string; [key: string]: any }];
  inputInfos: {
    id: string;
    word: string;
    translation: string;
    description: string;
  }[];
  onChange: (e: OnInputChangeEvent, index: number) => void;
  onRemoveClicked: (index: number) => void;
};

export const DynamicNInputs: React.FC<TDynamicNInputsProps> = ({
  inputInfos,
  onChange,
  onRemoveClicked,
}) => {
  return (
    <>
      {inputInfos.map(({ id, word, translation, description }, i) => {
        const info = [
          {
            value: word,
            label: 'Word',
            name: 'word',
            onChange: (e: OnInputChangeEvent) => onChange(e, i),
          },
          {
            value: description,
            label: 'Description',
            name: 'description',
            onChange: (e: OnInputChangeEvent) => onChange(e, i),
          },
          {
            value: translation,
            label: 'Translation',
            name: 'translation',
            onChange: (e: OnInputChangeEvent) => onChange(e, i),
          },
        ];

        const onClick = i > 0 ? () => onRemoveClicked(i) : undefined;

        return (
          <NInputsBox
            key={id}
            inputInfos={info}
            onRemoveClicked={onClick}
          />
        );
      })}
    </>
  );
};
