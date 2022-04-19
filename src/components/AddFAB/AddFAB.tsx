import React from 'react';
import { Fab, FabProps } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// export const AddFAB: React.FC<FabProps> = ({ ...props }): JSX.Element => {
export const AddFAB = React.forwardRef<HTMLButtonElement, FabProps>((props, ref) => (
  <Fab
    aria-label="add"
    sx={{ position: 'fixed', bottom: 16, right: '16px' }}
    {...props}
    ref={ref}
  >
    <AddIcon />
  </Fab>
));
