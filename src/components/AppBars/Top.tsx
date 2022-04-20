import React from 'react';
import {
  AppBar, Box, styled, Toolbar, Typography,
} from '@mui/material';

type TTopProps = {
  title?: string;
  children: React.ReactNode;
};

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export const Top: React.FC<TTopProps> = ({ title, children }) => {
  const titleLabel = title
    ? (
      <Typography
        variant="h6"
        component="h2"
        sx={{ flexGrow: 1 }}
      >
        {title}
      </Typography>
    )
    : null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box>
        <AppBar position="fixed">
          <Toolbar>
            {titleLabel}
          </Toolbar>
        </AppBar>
        <Offset />
      </Box>
      {children}
      <Box />
    </Box>
  );
};
