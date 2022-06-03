import React, { FC, ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { MARGIN_BOTTOM } from './constants';

type TBoxFieldProps = {
  title?: string;
  children: ReactNode;
};

export const BoxField: FC<TBoxFieldProps> = ({ title, children }) => {
  const titleEl = title && (
    <Typography
      variant="subtitle1"
      component="h3"
      sx={{ mb: 1 }}
    >
      {title}
    </Typography>
  );

  return (
    <Box sx={{ mb: MARGIN_BOTTOM }}>
      {titleEl}
      {children}
    </Box>
  );
};
