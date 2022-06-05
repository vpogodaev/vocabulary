import React, { FormEvent, useEffect, useState } from 'react';
import { Box, SelectChangeEvent } from '@mui/material';
import { nanoid } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
import { SingleTextField } from './components/SingleTextField';
import {
  InputChangeEvent,
  KeysWithStringValues,
} from '../../../helpers/typeAbbreviations';
import { ComboBoxField } from './components/ComboBoxField';
import {
  InputInfos,
  InputValue,
  InputValues,
} from './components/NInputs/props';
import { NInputsBlock } from './components/NInputs/NInputsBlock';
import {
  ComboBoxMetadata,
  MetadataType,
  NInputsMetadata,
  TextInputMetadata,
} from './services/metadataTypes';

export type FormSubmitResult = {
  id: string;
  value: string | KeysWithStringValues[];
}[];

type TDynamicFormProps = {
  onSubmit: (result: FormSubmitResult) => void;
  metaData: (TextInputMetadata | ComboBoxMetadata | NInputsMetadata)[];
  initValues: (string | KeysWithStringValues[] | undefined)[];
};

type SetValue = (
  value: string,
  // eslint-disable-next-line no-use-before-define
  state: State[],
  // eslint-disable-next-line no-use-before-define
  setState: React.Dispatch<React.SetStateAction<State[]>>,
) => void;

type SetNInputsValue = (
  value: string,
  // eslint-disable-next-line no-use-before-define
  state: State[],
  // eslint-disable-next-line no-use-before-define
  setState: React.Dispatch<React.SetStateAction<State[]>>,
  index: number,
  name: string,
) => void;

type State = {
  id: string;
  value: string | InputValues<KeysWithStringValues>;
  setValue: SetValue | SetNInputsValue;
  type: MetadataType;
};

const getOneNewValueForNInputs = (
  infos: InputInfos,
  initValue?: KeysWithStringValues,
) => {
  const inputInfoKeys = Object.keys(infos);
  const names = inputInfoKeys.map((key) => infos[key].name);
  const inputsValues: InputValue<{
    [k in typeof names[number]]: string;
  }> = {
    id: nanoid(),
  };

  names.forEach((n) => {
    inputsValues[n] = (initValue && initValue[n]) ?? '';
  });

  return inputsValues;
};

const getNewValueForNInputs = (
  infos: InputInfos,
  initValue?: KeysWithStringValues[],
) =>
  initValue && initValue.length
    ? initValue.map((v) => getOneNewValueForNInputs(infos, v))
    : [getOneNewValueForNInputs(infos)];

export const DynamicForm = ({
  onSubmit,
  metaData,
  initValues,
}: TDynamicFormProps) => {
  const [state, setState] = useState<State[]>([]);

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    const result: FormSubmitResult = [];
    state.forEach(({ id, type, ...rest }) => {
      let value: string | KeysWithStringValues[];

      if (type !== MetadataType.nInputs) {
        value = rest.value;
      } else {
        value = [];
        (rest.value as InputValues<KeysWithStringValues>).forEach(
          ({ id, ...restValues }, i) => {
            const values = Object.keys(restValues).reduce(
              (p, c) => p + restValues[c],
              '',
            );

            if (
              values ||
              (!value.length &&
                (rest.value as InputValues<KeysWithStringValues>).length ===
                  i + 1)
            ) {
              (value as KeysWithStringValues[]).push({ ...restValues });
            }
          },
        );
      }

      result.push({ id, value });
    });

    onSubmit(result);
  };

  const handleTextFieldChanged = (
    e: InputChangeEvent,
    set: (value: string) => void,
  ) => {
    const { value } = e.target;
    set(value);
  };

  const handleComboBoxFieldChanged = (
    e: SelectChangeEvent,
    set: (value: string) => void,
  ) => {
    const { value } = e.target;
    set(value);
  };

  const handleNInputChanged = (
    e: InputChangeEvent,
    set: (value: string) => void,
  ) => {
    const { value } = e.target;
    set(value);
  };

  const handleNInputRemoveClicked = (id: string, index: number) => {
    const inputsIndex = state.findIndex((s) => s.id === id);
    if (inputsIndex < 0) {
      return;
    }

    const oldValue = cloneDeep(
      state[inputsIndex].value as InputValues<KeysWithStringValues>,
    );
    const inputs = {
      ...state[inputsIndex],
      value: [...oldValue.slice(0, index), ...oldValue.slice(index + 1)],
    };

    setState(() => [
      ...state.slice(0, inputsIndex),
      inputs,
      ...state.slice(inputsIndex + 1),
    ]);
  };

  const handleNInputAddClicked = (id: string) => {
    const meta = metaData.find(
      (m) => m.id === id && m.type === MetadataType.nInputs,
    );
    if (!meta || !('items' in meta)) {
      return;
    }
    const oldInputsIndex = state.findIndex((s) => s.id === id);
    if (oldInputsIndex < 0) {
      return;
    }

    const inputInfos = meta.items as InputInfos;

    const newInputs = cloneDeep(state[oldInputsIndex]);
    (newInputs.value as InputValues<KeysWithStringValues>).push(
      getOneNewValueForNInputs(inputInfos),
    );
    setState(() => [
      ...state.slice(0, oldInputsIndex),
      newInputs,
      ...state.slice(oldInputsIndex + 1),
    ]);
  };

  useEffect(() => {
    const newState: State[] = [];
    return metaData.forEach(({ type, id, ...rest }, i) => {
      switch (type) {
        case MetadataType.textBox:
        case MetadataType.textArea:
          {
            const setValue = (
              value: string,
              state: State[],
              setState: React.Dispatch<React.SetStateAction<State[]>>,
            ) => {
              const newField = {
                id,
                value,
                setValue,
                type,
              };

              setState(() => [
                ...state.slice(0, i),
                newField,
                ...state.slice(i + 1),
              ]);
            };
            newState.push({
              id,
              value: (initValues[i] as string) ?? '',
              setValue,
              type,
            });
          }
          break;
        case MetadataType.comboBox:
          {
            if (!('items' in rest)) {
              return;
            }

            const setValue = (
              value: string,
              state: State[],
              setState: React.Dispatch<React.SetStateAction<State[]>>,
            ) => {
              const newField = {
                id,
                value,
                setValue,
                type,
              };

              setState(() => [
                ...state.slice(0, i),
                newField,
                ...state.slice(i + 1),
              ]);
            };

            newState.push({
              id,
              value:
                (initValues[i] as string) ??
                (rest as ComboBoxMetadata).defaultElement ??
                '',
              setValue,
              type,
            });
          }
          break;
        case MetadataType.nInputs:
          {
            if (!('items' in rest)) {
              return;
            }

            const inputInfos = rest.items as InputInfos;

            const value = getNewValueForNInputs(
              inputInfos,
              initValues[i] as KeysWithStringValues[],
            );

            const setValue = (
              value: string,
              state: State[],
              setState: React.Dispatch<React.SetStateAction<State[]>>,
              index: number,
              name: string,
            ) => {
              const input = cloneDeep(state[i]);
              if (typeof input.value !== 'object') {
                return;
              }
              input.value[index][name] = value;

              setState(() => [
                ...state.slice(0, i),
                input,
                ...state.slice(i + 1),
              ]);
            };

            newState.push({
              id,
              value,
              setValue,
              type,
            });
          }
          break;
        default:
          break;
      }

      setState(newState);
    });
  }, []);

  const getElements = () =>
    state.map(({ id, value, setValue }, i) => {
      const meta = metaData.find((m) => m.id === id);
      if (!meta) {
        return null;
      }
      const { type, name, label, required } = meta;

      switch (type) {
        case MetadataType.textBox:
        case MetadataType.textArea: {
          return (
            <SingleTextField
              key={id}
              id={id}
              name={name}
              value={value as string}
              label={label}
              multiline={type === MetadataType.textArea}
              required={required}
              onChange={(e) =>
                handleTextFieldChanged(e, (s) =>
                  (setValue as SetValue)(s, state, setState),
                )
              }
            />
          );
        }
        case MetadataType.comboBox: {
          if (!('items' in meta)) {
            return null;
          }
          const { items, noneAvailable } = meta as ComboBoxMetadata;
          return (
            <ComboBoxField
              key={id}
              id={id}
              name={name}
              value={value as string}
              label={label}
              onChange={(e) =>
                handleComboBoxFieldChanged(e, (s) =>
                  (setValue as SetValue)(s, state, setState),
                )
              }
              items={items}
              noneAvailable={noneAvailable}
              required={required}
            />
          );
        }
        case MetadataType.nInputs: {
          if (!('items' in meta)) {
            return null;
          }
          const { items } = meta as NInputsMetadata;
          return (
            <NInputsBlock
              key={id}
              title={label}
              addLabel="Add"
              inputValues={value as InputValues<KeysWithStringValues>}
              inputInfos={items}
              onChange={(e, i, n) =>
                handleNInputChanged(e, (s) =>
                  (setValue as SetNInputsValue)(s, state, setState, i, n),
                )
              }
              onRemoveClicked={(i) => handleNInputRemoveClicked(id, i)}
              onAddClicked={() => handleNInputAddClicked(id)}
              required={required}
            />
          );
        }
        default:
          return null;
      }
    });

  return (
    <Box
      component="form"
      onSubmit={handleSubmitForm}
      id="wordInputForm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {getElements()}
    </Box>
  );
};
