import React from 'react';
import { Element } from './Element';
import { Box, List, SxProps, Theme } from '@mui/material';
import { TElementPropsWithId } from './elementProps';

type TElementsListProps = {
  boxSx?: SxProps<Theme>;
  elements: TElementPropsWithId[];
  onElementClick?: (element: any) => void;
};

const defaultBoxSx = {
  height: '100%',
};

export const ElementsList: React.FC<TElementsListProps> = (
  {
    boxSx = defaultBoxSx,
    elements,
    onElementClick,
  }): JSX.Element => {
  const handleElementClick = (element: any) => {
    if (!onElementClick) {
      return;
    }
    onElementClick(element);
  };

  const list = elements.map(e => <Element key={e.id}
                                          onClick={() => handleElementClick(e)}
                                          {...e} />);

  return (
    <Box sx={boxSx}>
      <List>
        {list}
      </List>
    </Box>
  );
};