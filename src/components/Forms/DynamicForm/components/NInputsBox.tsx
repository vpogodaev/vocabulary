import React from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { OnInputChangeEvent } from '../../../../helpers/typeAbbreviations';

export type InputInfo = {
  value: string;
  label: string;
  name: string;
  onChange: (value: OnInputChangeEvent) => void;
};

type TNInputsBoxProps = {
  inputInfos: InputInfo[];
  onRemoveClicked?: () => void;
};

export const NInputsBox: React.FC<TNInputsBoxProps> = ({
  inputInfos,
  onRemoveClicked,
}) => {
  const inputs = inputInfos.map(({ value, label, name, onChange }, i) => (
    <TextField
      key={i}
      sx={{ width: '100%' }}
      value={value}
      name={name}
      label={label}
      onChange={onChange}
    />
  ));

  const removeBtn = onRemoveClicked && (
    <IconButton
      aria-label="delete"
      size="large"
      onClick={onRemoveClicked}
    >
      <DeleteIcon fontSize="inherit" />
    </IconButton>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridTemplateRows: '1fr',
          gap: 1,
          width: '100%',
        }}
      >
        {inputs}
      </Box>
      {removeBtn}
    </Box>
  );
};
