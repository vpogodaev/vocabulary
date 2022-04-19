import React from 'react';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { TElementProps } from './elementProps';

export const Element: React.FC<TElementProps> = ({ primaryText, secondaryText, onClick }) => (
  <ListItem disablePadding>
    <ListItemButton>
      <ListItemText
        primary={primaryText}
        secondary={secondaryText}
        onClick={onClick}
      />
    </ListItemButton>
  </ListItem>
);
