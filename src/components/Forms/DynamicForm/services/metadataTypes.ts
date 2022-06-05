import { ComboBoxItems } from '../../../Inputs/ComboBox';
import { InputInfos } from '../components/NInputs/props';

export enum MetadataType {
  textBox,
  textArea,
  comboBox,
  nInputs,
}

export type MetadataBase = {
  id: string;
  name: string;
  label: string;
  required?: boolean
};

type Metadata = { type: MetadataType } & MetadataBase;

export type TextInputMetadata = Metadata;

export type ComboBoxSpecMetadata = {
  items: ComboBoxItems;
  defaultElement?: string;
  noneAvailable?: boolean;
};
export type ComboBoxMetadata = Metadata & ComboBoxSpecMetadata;

export type NInputsSpecMetadata = {
  items: InputInfos;
};
/**
 * If required = true then block's required (items[...].required) will be checked
 */
export type NInputsMetadata = Metadata & NInputsSpecMetadata;
