import React from 'react';
import {
  InputChangeEvent,
  KeysWithStringValues,
} from '../../../../../helpers/typeAbbreviations';
import { NInputs } from './NInputs';
import { InputInfos, InputValues } from './props';

type TNInputsListProps<T extends KeysWithStringValues> = {
  inputValues: InputValues<T>;
  inputInfos: InputInfos;
  onChange: (e: InputChangeEvent, index: number, inputName: string) => void;
  onRemoveClicked: (index: number) => void;
};

/**
 * Several {@link NInputs} united in one list
 */
export const NInputsList = <T extends KeysWithStringValues>({
  inputValues,
  inputInfos,
  onChange,
  onRemoveClicked,
}: TNInputsListProps<T>) => (
  <>
    {inputValues.map(({ id, ...rest }, i) => {
      const inputFieldKeys = Object.keys(rest);

      const info = inputFieldKeys.map((key) => ({
        value: rest[key],
        name: inputInfos[key].name,
        label: inputInfos[key].label,
        onChange: (e: InputChangeEvent) => onChange(e, i, key),
      }));

      const onClick = i > 0 ? () => onRemoveClicked(i) : undefined;

      return (
        <NInputs
          key={id}
          inputsData={info}
          onRemoveClicked={onClick}
        />
      );
    })}
  </>
);
