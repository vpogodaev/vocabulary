import React from 'react';
import { TextField } from '@mui/material';
import { WIDTH } from './constants';
import { OnInputChanged } from '../../../../helpers/typeAbbreviations';
import { BoxField } from './BoxField';

type TSingleTextFieldProps = {
  id?: string | undefined;
  name?: string | undefined;
  label: string;
  value: string;
  multiline?: boolean;
  onTextChanged: OnInputChanged;
};

export const SingleTextField = ({
  id,
  name,
  label,
  value,
  onTextChanged,
  multiline = false,
}: TSingleTextFieldProps) => (
  <BoxField>
    <TextField
      sx={{ width: WIDTH }}
      id={id}
      name={name}
      label={label}
      value={value}
      multiline={multiline}
      onChange={onTextChanged}
    />
  </BoxField>
);
