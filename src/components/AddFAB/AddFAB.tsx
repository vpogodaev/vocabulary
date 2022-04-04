import React from 'react';
import { Fab, FabProps } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const AddFAB: React.FC<FabProps> = ({...props}): JSX.Element => {
  return (
    <Fab aria-label="add"
         sx={{position: 'sticky', bottom: 16, left: '100%'}}
         {...props}>
      <AddIcon />
    </Fab>
  );
};