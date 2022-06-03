import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
  Theme,
} from '@mui/material';
import React from 'react';

type ComboBoxItem = {
  value: string | number;
  label: string;
};

export type ComboBoxItems = ComboBoxItem[];

export type TComboBoxProps = {
  id: string;
  labelId?: string;
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent, child?: React.ReactNode) => void;
  items: ComboBoxItems;
  sx?: SxProps<Theme> | undefined;
  name?: string;
  noneAvailable?: boolean;
  noneTitle?: string;
};

export const ComboBox = ({
  id,
  labelId,
  label,
  value,
  onChange,
  items,
  sx,
  name,
  noneAvailable,
  noneTitle,
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

  if (noneAvailable) {
    menuItems.unshift(
      <MenuItem
        key={`_none_${menuItems.length}`}
        value=""
      >
        <em>{noneTitle ?? 'None'}</em>
      </MenuItem>,
    );
  }

  return (
    <FormControl sx={sx ?? { minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={value}
        label={label}
        onChange={onChange}
        name={name}
      >
        {menuItems}
      </Select>
      {/* <FormHelperText>With label + helper text</FormHelperText> */}
    </FormControl>
  );
};
