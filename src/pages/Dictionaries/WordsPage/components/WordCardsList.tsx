import React from 'react';
import { IWord } from '../../../../models/Dictionary/IWord';
import { WordCard } from './WordCard';
import { Grid } from '@mui/material';

type TWordCardsListProps = {
  words: IWord[];
};

export const WordCardsList: React.FC<TWordCardsListProps> = ({ words }) => {
  const wordsToRender = words.map((w) => (
    <Grid
      item
      key={w.id}
      xs={12}
    >
      <WordCard word={w} />
    </Grid>
  ));

  return (
    <Grid
      container
      spacing={1}
      sx={{ marginTop: 0 }}
    >
      {wordsToRender}
    </Grid>
  );
};
