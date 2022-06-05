import React, { FC } from 'react';
import { TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { WIDTH } from './constants';
import { BoxField } from './BoxField';

export const SingleTextField: FC<TextFieldProps> = (props) => (
  <BoxField>
    <TextField
      sx={{ width: WIDTH }}
      {...props}
    />
  </BoxField>
);
