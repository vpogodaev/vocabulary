import {
  FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import React from 'react';

type TComboBoxProps = {
  id: string,
  labelId?: string,
  label: string,
  value: string | number,
  onChange: (event: SelectChangeEvent<string | number>, child: React.ReactNode) => void,
  items: [{ value: string | number, label: string }],
};

export const ComboBox = ({
  id, labelId, label, value, onChange, items,
}: TComboBoxProps) => {
  labelId = labelId || `${id}-label`;

  const menuItems = items.map((i) => <MenuItem value={i.value}>{i.label}</MenuItem>);

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={value}
        label={label}
        onChange={onChange}
      >
        {menuItems}
      </Select>
      {/* <FormHelperText>With label + helper text</FormHelperText> */}
    </FormControl>
  );
};
