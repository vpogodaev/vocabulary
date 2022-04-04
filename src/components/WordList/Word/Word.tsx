import React from 'react';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';

import { IWord } from '../../../models/interfaces/interfaces';

import styles from './Word.module.scss';

declare type TWordProps = {
  word: IWord;
};
const Word: React.FC<TWordProps> = ({word}): JSX.Element => {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemText primary={word.value1}
                      secondary={word.value2} />
      </ListItemButton>
    </ListItem>
  );
};

export default Word;