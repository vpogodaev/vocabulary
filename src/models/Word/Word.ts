import { PartOfSpeech } from './PartOfSpeach';

export enum WordType {
  enCommon = 'enCommon',
  jpKanji = 'jpKanji',
  jpKana = 'jpKana',
  jpJukungoOkurigana = 'jpJukungoOkurigana',
}

export interface ITranslate {
  value: string;
  description?: string;
}

export interface IWordBase {
  value: string;
  description?: string;
  type: WordType;
}

export interface IWordWithPartOfSpeech extends IWordBase {
  partOfSpeech?: PartOfSpeech;
}

export interface IWordWithTranslates extends IWordBase {
  translates: ITranslate[];
}

export interface IWordWithTranscription extends IWordBase {
  transcription: string;
}
