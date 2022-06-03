import React from 'react';
import { ComboBox, TComboBoxProps } from '../../../Inputs/ComboBox';
import { BoxField } from './BoxField';

type TComboBoxFieldProps = TComboBoxProps;

export const ComboBoxField = (props: TComboBoxFieldProps) => (
  <BoxField>
    <ComboBox
      sx={{ width: '100%' }}
      {...props}
    />
  </BoxField>
);
