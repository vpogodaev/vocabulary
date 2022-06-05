import React from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { WIDTH } from '../constants';
import { InputProps } from './props';

type TNInputsProps = {
  inputsData: InputProps[];
  /**
   * If not passed, Remove button will not be added
   */
  onRemoveClicked?: () => void;
};

/**
 * Several {@link TextField} inputs
 */
export const NInputs: React.FC<TNInputsProps> = ({
  inputsData,
  onRemoveClicked,
}) => {
  const inputs = inputsData.map(({ value, label, name, onChange, required }, i) => (
    <TextField
      key={i}
      sx={{ width: WIDTH }}
      value={value}
      name={name}
      label={label}
      onChange={onChange}
      required={required}
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
