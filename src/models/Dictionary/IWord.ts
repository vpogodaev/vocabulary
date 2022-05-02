export enum PartsOfSpeech {
  empty = 'empty',
  noun = 'noun',
  verb = 'verb',
  adjective = 'adjective',
  pronoun = 'pronoun',
  conjunction = 'conjunction',
  interjection = 'interjection',
  prenominal = 'prenominal',
}

export type TWordValue = {
  value: string;
  isMain: boolean;
}

interface IWordBase {
  mainWord?: string;
  secondaryWords?: TWordValue[];
  translates: TWordValue[];
  partOfSpeech: PartsOfSpeech;
  description?: string;
}

export interface IWord extends IWordBase {
  dictionaryId: number;
  id: number;
}

export interface INewWord extends IWordBase {
  dictionaryId?: number;
}
