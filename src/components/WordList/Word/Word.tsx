import React from 'react';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';

import { IWord } from '../../App/App';

import styles from './Word.module.scss';

declare type TWordProps = {
  word: IWord;
};
const Word: React.FC<TWordProps> = ({word}): JSX.Element => {
  console.log(word);
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemText primary={word.value1} secondary={word.value2} />
      </ListItemButton>
    </ListItem>
  );
};

export default Word;