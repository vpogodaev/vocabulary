import React from 'react';
import { Element, TElementProps } from './Element';
import { Box, List } from '@mui/material';

type TElementsListProps = {
  elements: TElementProps[];
};

export const ElementsList: React.FC<TElementsListProps> = ({elements}): JSX.Element => {
  const list = elements.map(e => <Element {...e} />);

  return (
    <Box>
      <List>
        {list}
      </List>
    </Box>
  );
};