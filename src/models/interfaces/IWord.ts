interface IWordBase {
  //TODO: tmp
  value1: string;
  value2: string;
}

export interface IWord extends IWordBase {
  id: number;
}

export interface INewWord extends IWordBase {
  value1: string;
  value2: string;
}