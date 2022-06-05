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
}: MetadataBase & InitValue) => ({
  metadata: getTextBoxMD({ id, name, label }),
  initValue,
});

export const getTextAreaProps = ({
  id,
  name,
  label,
  initValue,
}: MetadataBase & InitValue) => ({
  metadata: getTextAreaMD({ id, name, label }),
  initValue,
});

export const getComboBoxProps = ({
  id,
  name,
  label,
  initValue,
  items,
  defaultElement,
}: MetadataBase & ComboBoxSpecMetadata & InitValue) => ({
  metadata: getComboBoxMD({ id, name, label, items, defaultElement }),
  initValue,
});

export const getNInputsProps = ({
  id,
  name,
  label,
  items,
  initValue,
}: MetadataBase & NInputsSpecMetadata & InitValueNInputs) => ({
  metadata: getNInputsMD({ id, name, label, items }),
  initValue,
});
