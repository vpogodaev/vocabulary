import { VocabularyBaseLanguage } from './Language';

interface IVocabularyBase {
  name: string;
  description?: string;
  baseLanguage: VocabularyBaseLanguage;
  lang1: string;
  lang2: string;
}

export interface IVocabulary extends IVocabularyBase {
  id: number;
}

export type INewVocabulary = IVocabularyBase;
