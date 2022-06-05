import { VocabularyBaseLanguage } from '../models/Vocabulary/Language';
import { WordType } from '../models/Word/Word';

const langTypes = {
  [VocabularyBaseLanguage.en]: [WordType.enCommon],
  [VocabularyBaseLanguage.jp]: [
    WordType.jpKanji,
    WordType.jpKana,
    WordType.jpJukungoOkurigana,
  ],
};

export const getWordTypes = (baseLang: VocabularyBaseLanguage) => langTypes[baseLang];

const wordLabels = {
  [WordType.enCommon]: '',
  [WordType.jpKanji]: 'Kanji',
  [WordType.jpKana]: 'Kana',
  [WordType.jpJukungoOkurigana]: 'Jukungo / Okurigana',
}
export const getWordTypeLabel = (type: WordType) => wordLabels[type];