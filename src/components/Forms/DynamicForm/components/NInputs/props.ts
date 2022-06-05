import {
  InputChangeEvent,
  KeysWithStringValues,
} from '../../../../../helpers/typeAbbreviations';

/**
 * Props required for an input
 */
export type InputProps = {
  value: string;
  label: string;
  name: string;
  onChange: (value: InputChangeEvent) => void;
};

export type InputValue<T extends KeysWithStringValues> = {
  id: string;
} & KeysWithStringValues;
/**
 * Values for inputs with input block id
 */
export type InputValues<T extends KeysWithStringValues> = InputValue<T>[];

/**
 * Static info for input
 */
export type InputInfo = {
  name: string;
  label: string;
};

/**
 * {@link InputInfo} for several inputs
 */
export type InputInfos = {
  [k in keyof KeysWithStringValues]: InputInfo;
};
