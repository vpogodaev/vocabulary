import React from 'react';
import { IWord } from '../../../../models/Vocabulary/IWord';
import { WordCard } from './WordCard';
import { Grid } from '@mui/material';

type TWordCardsListProps = {
  words: IWord[];
  marginBottom?: number;
  onEditClicked: (word: IWord) => void;
};

export const WordCardsList: React.FC<TWordCardsListProps> = ({
  words,
  marginBottom,
  onEditClicked,
}) => {
  const wordsToRender = words.map((w) => (
    <Grid
      item
      key={w.id}
      xs={12}
    >
      <WordCard
        word={w}
        onEditClicked={onEditClicked}
      />
    </Grid>
  ));

  return (
    <Grid
      container
      spacing={1}
      sx={{ marginTop: 0, marginBottom }}
    >
      {wordsToRender}
    </Grid>
  );
};
