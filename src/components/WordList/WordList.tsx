import React from 'react';

import { IWord } from '../App/App';

import styles from './WordList.module.scss';

declare type TWordListProps = {
  words: IWord[];
};

const WordList: React.FC<TWordListProps> = ({words}): JSX.Element => {
  return (
    <div>
      <ul>
        {words.map(w => <Word key={w.id}
                              word={w} />)}
      </ul>
    </div>
  );
};

declare type TWordProps = {
  word: IWord;
};
const Word: React.FC<TWordProps> = ({word}): JSX.Element => {
  return (
    <div>
      <div>First Language: <span>{word.firstLanguageValue}</span></div>
      <div>Second Language: <span>{word.secondLanguageValue}</span></div>
    </div>
  );
};

export default WordList;