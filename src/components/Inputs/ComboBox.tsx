import {
  FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import React from 'react';

type TComboBoxProps = {
  id: string,
  labelId?: string,
  label: string,
  value: string,
  onChange: (event: SelectChangeEvent, child?: React.ReactNode) => void,
  items: { value: string | number, label: string }[],
};

export const ComboBox = ({
  id, labelId, label, value, onChange, items,
}: TComboBoxProps) => {
  labelId = labelId || `${id}-label`;

  const menuItems = items.map((i) => (
    <MenuItem
      key={i.value}
      value={i.value}
    >
      {i.label}
    </MenuItem>
  ));

  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
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
