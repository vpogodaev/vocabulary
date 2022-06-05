import React from 'react';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { NInputsList } from './NInputsList';
import {
  InputChangeEvent,
  KeysWithStringValues,
} from '../../../../../helpers/typeAbbreviations';
import { BoxField } from '../BoxField';
import { InputInfos, InputValues } from './props';

type TNInputsBlockProps<T extends KeysWithStringValues> = {
  title?: string;
  inputValues: InputValues<T>;
  inputInfos: InputInfos;
  onChange: (e: InputChangeEvent, index: number, inputName: string) => void;
  onRemoveClicked: (index: number) => void;
  // If callback not passed, Add button will not be added
  onAddClicked?: () => void;
  addLabel?: string;
  required?: boolean;
};

/**
 * Several {@link NInputs} united in one block with add new one function
 */
export const NInputsBlock = <T extends KeysWithStringValues>({
  title,
  inputValues,
  inputInfos,
  onChange,
  onRemoveClicked,
  onAddClicked,
  addLabel,
  required
}: TNInputsBlockProps<T>) => (
  <BoxField title={title}>
    <Box sx={{ display: 'grid', gap: 3, mb: 4 }}>
      <Box sx={{ display: 'grid', gap: 2 }}>
        <NInputsList<T>
          inputValues={inputValues}
          inputInfos={inputInfos}
          onChange={onChange}
          onRemoveClicked={onRemoveClicked}
          required={required}
        />
      </Box>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={onAddClicked}
      >
        {addLabel}
      </Button>
    </Box>
  </BoxField>
);
