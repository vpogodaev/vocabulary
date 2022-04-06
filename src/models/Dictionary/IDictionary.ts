interface IDictionaryBase {
  name: string;
  description?: string;
  lang1: string;
  lang2: string;
}

export interface IDictionary extends IDictionaryBase {
  id: number;
}

export interface INewDictionary extends IDictionaryBase {
}
