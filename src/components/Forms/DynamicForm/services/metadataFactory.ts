import {
  ComboBoxMetadata,
  ComboBoxSpecMetadata,
  MetadataBase,
  MetadataType,
  NInputsMetadata,
  NInputsSpecMetadata,
  TextInputMetadata,
} from './metadataTypes';
import { PartsOfSpeech } from '../../../../models/Vocabulary/IWord';

export const getTextBoxMD = ({
  id,
  name,
  label,
}: MetadataBase): TextInputMetadata => ({
  type: MetadataType.textBox,
  id,
  name,
  label,
});

export const getTextAreaMD = ({
  id,
  name,
  label,
}: MetadataBase): TextInputMetadata => ({
  type: MetadataType.textArea,
  id,
  name,
  label,
});

export const getComboBoxMD = ({
  id,
  name,
  label,
  items,
  defaultElement,
}: MetadataBase & ComboBoxSpecMetadata): ComboBoxMetadata => ({
  type: MetadataType.comboBox,
  id,
  name,
  label,
  items,
  defaultElement,
});

export const getNInputsMD = ({
  id,
  name,
  label,
  items,
}: MetadataBase & NInputsSpecMetadata): NInputsMetadata => ({
  type: MetadataType.nInputs,
  id,
  name,
  label,
  items,
});

export const exampleMetaData = (): (
  | TextInputMetadata
  | ComboBoxMetadata
  | NInputsMetadata
)[] => [
  getTextBoxMD({ id: 'kanjiInput', name: 'kanji', label: 'Kanji' }),
  getTextBoxMD({ id: 'kanjiInput2', name: 'kanji', label: 'Kanji' }),
  getTextAreaMD({
    id: 'kanjiDescription',
    name: 'description',
    label: 'Description',
  }),
  getComboBoxMD({
    id: 'partOfSpeechComboBox',
    name: 'partOfSpeech',
    label: 'Part Of Speech',
    items: Object.entries(PartsOfSpeech).map(([k, v]) => ({
      value: k,
      label: v.charAt(0).toUpperCase() + v.slice(1),
    })),
  }),
  getNInputsMD({
    id: 'onWordsNInputs',
    name: 'onWords',
    label: 'On:',
    items: {
      word: {
        name: 'word',
        label: 'Word',
      },
      translation: {
        name: 'translation',
        label: 'Translation',
      },
      description: {
        name: 'description',
        label: 'Description',
      },
    },
  }),
];
