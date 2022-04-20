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
