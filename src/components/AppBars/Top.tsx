import React from 'react';
import {
  AppBar, Box, styled, Toolbar, Typography,
} from '@mui/material';
import { BarGuiding, BarGuidingFactory } from './AppBars';

type TTopProps = {
  title?: string;
  children: React.ReactNode;
  // TODO: make more elegant?
  guiding?: BarGuiding;
  onGuidingClick?: () => void;
};

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export const Top: React.FC<TTopProps> = ({
  title, children, guiding, onGuidingClick,
}) => {
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

  const guidingElement = guiding
    ? (
      <BarGuidingFactory
        guiding={BarGuiding.back}
        onClick={onGuidingClick}
      />
    )
    : null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box>
        <AppBar position="fixed">
          <Toolbar>
            {guidingElement}
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
