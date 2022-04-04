import React from 'react';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';

type TElementProps = {
  primaryText: string;
  secondaryText: string;
};

export const Element: React.FC<TElementProps> = ({primaryText, secondaryText}): JSX.Element => {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemText primary={primaryText}
                      secondary={secondaryText} />
      </ListItemButton>
    </ListItem>
  );
};