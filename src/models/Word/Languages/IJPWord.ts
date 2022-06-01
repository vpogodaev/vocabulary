import {
  ITranslate,
  IWordBase,
  IWordWithPartOfSpeech,
  IWordWithTranscription,
  IWordWithTranslates,
} from '../IWord';

export type TKanjiTranscription = {
  value: string;
  translates: ITranslate[];
};

export interface IJPWordHirKat
  extends IWordBase,
    IWordWithPartOfSpeech,
    IWordWithTranslates {}

export interface IJPWordKanji extends IWordBase {
  on?: TKanjiTranscription[];
  kun?: TKanjiTranscription[];
}

export interface IJPWordOkurigana
  extends IWordBase,
    IWordWithPartOfSpeech,
    IWordWithTranslates,
    IWordWithTranscription {}

export interface IJPWordJukugo
  extends IWordBase,
    IWordWithPartOfSpeech,
    IWordWithTranslates,
    IWordWithTranscription {}
