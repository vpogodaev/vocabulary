// interface ICategoryValue {
//   value: string;
//   description: string;
// }
//
// interface ICategory {
//   name: string;
//   description?: string;
//   values: ICategoryValue;
// }

interface IWordBase {
  //TODO: tmp
  value1: string;
  value2: string;
}

export interface IWord extends IWordBase {
  id: number;
}

export interface INewWord extends IWordBase {

}