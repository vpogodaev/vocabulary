enum PartsOfSpeach {
  noun = 'noun',
  verb = 'verb',
  adjective = 'adjective',
  pronoun = 'pronoun',
  conjunction = 'conjunction',
  interjection = 'interjection',
  prenominal = 'prenominal'
}

interface IWordBase {
  // TODO: tmp
  value1: string;
  value2: string;
}

export interface IWord extends IWordBase {
  dictionaryId: number;
  id: number;
}

export interface INewWord extends IWordBase {

}


