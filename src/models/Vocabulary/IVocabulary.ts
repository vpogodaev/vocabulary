interface IVocabularyBase {
  name: string;
  description?: string;
  lang1: string;
  lang2: string;
}

export interface IVocabulary extends IVocabularyBase {
  id: number;
}

export interface INewVocabulary extends IVocabularyBase {
}
