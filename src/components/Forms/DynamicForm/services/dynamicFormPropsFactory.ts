import {
  ComboBoxSpecMetadata,
  MetadataBase,
  NInputsSpecMetadata,
} from './metadataTypes';
import {
  getComboBoxMD,
  getNInputsMD,
  getTextAreaMD,
  getTextBoxMD,
} from './metadataFactory';
import { KeysWithStringValues } from '../../../../helpers/typeAbbreviations';

export type InitValue = { initValue?: string };
export type InitValueNInputs = { initValue?: KeysWithStringValues[] };

export const getTextBoxProps = ({
  id,
  name,
  label,
  initValue,
  required,
}: MetadataBase & InitValue) => ({
  metadata: getTextBoxMD({ id, name, label, required }),
  initValue,
});

export const getTextAreaProps = ({
  id,
  name,
  label,
  initValue,
  required,
}: MetadataBase & InitValue) => ({
  metadata: getTextAreaMD({ id, name, label, required }),
  initValue,
});

export const getComboBoxProps = ({
  id,
  name,
  label,
  initValue,
  items,
  defaultElement,
  required,
}: MetadataBase & ComboBoxSpecMetadata & InitValue) => ({
  metadata: getComboBoxMD({ id, name, label, items, defaultElement, required }),
  initValue,
});

export const getNInputsProps = ({
  id,
  name,
  label,
  items,
  initValue,
  required,
}: MetadataBase & NInputsSpecMetadata & InitValueNInputs) => ({
  metadata: getNInputsMD({ id, name, label, items, required }),
  initValue,
});
