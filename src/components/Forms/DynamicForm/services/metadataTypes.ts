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
};

type Metadata = MetadataBase & { type: MetadataType };

export type TextInputMetadata = Metadata;

export type ComboBoxSpecMetadata = {
  items: ComboBoxItems;
  defaultElement?: string;
};
export type ComboBoxMetadata = Metadata & ComboBoxSpecMetadata;

export type NInputsSpecMetadata = {
  items: InputInfos;
};
export type NInputsMetadata = Metadata & NInputsSpecMetadata;
