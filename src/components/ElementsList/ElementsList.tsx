import React from 'react';
import { Element } from './Element';
import { Box, List, SxProps, Theme } from '@mui/material';
import { TElementPropsWithId } from './elementProps';

type TElementsListProps = {
  boxSx?: SxProps<Theme>;
  elements: TElementPropsWithId[];
};

const defaultBoxSx = {
  height: '100vh',
};

export const ElementsList: React.FC<TElementsListProps> = ({boxSx = defaultBoxSx, elements}): JSX.Element => {
  const list = elements.map(e => <Element key={e.id} {...e} />);

  return (
    <Box sx={boxSx}>
      <List>
        {list}
      </List>
    </Box>
  );
};