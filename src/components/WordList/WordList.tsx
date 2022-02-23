import React from 'react';
import { Box, List } from '@mui/material';

import Word from './Word/Word';

import { IWord } from '../../models/interfaces/IWord';

import styles from './WordList.module.scss';

declare type TWordListProps = {
  words: IWord[];
};

const WordList: React.FC<TWordListProps> = ({words}): JSX.Element => {
  const wordElements = words.map(w => <Word key={w.id}
                                            word={w} />);
  return (
    <Box>
      <List>
        {wordElements}
      </List>
    </Box>
  );
};

export default WordList;