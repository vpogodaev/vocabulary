import React from 'react';
import { OnInputChangeEvent } from '../../../../helpers/typeAbbreviations';
import { NInputsBox } from './NInputsBox';

export type InputInfo = {
  name: string;
  label: string;
};

type TDynamicNInputsProps<T extends { [key: string]: string }> = {
  inputsData: ({
    id: string;
  } & T)[];
  inputsInfo: {
    [k in keyof T]: InputInfo;
  };
  onChange: (e: OnInputChangeEvent, index: number) => void;
  onRemoveClicked: (index: number) => void;
};

export const DynamicNInputs = <T extends { [key: string]: string }>({
  inputsData,
  inputsInfo,
  onChange,
  onRemoveClicked,
}: TDynamicNInputsProps<T>) => (
  <>
    {inputsData.map(({ id, ...rest }, i) => {
      const inputFieldKeys = Object.keys(rest);

      const info = inputFieldKeys.map((key) => ({
        value: rest[key],
        name: inputsInfo[key].name,
        label: inputsInfo[key].label,
        onChange: (e: OnInputChangeEvent) => onChange(e, i),
      }));

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
