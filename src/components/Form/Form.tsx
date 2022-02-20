import React, { FormEvent, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, IconButton, Slide, TextField, Toolbar, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';

import styles from './Form.module.scss';

declare type TFormProps = {
  open: boolean;
  onClose: () => void;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up"
                ref={ref} {...props} />;
});

const Form: React.FC<TFormProps> = ({open, onClose}): JSX.Element => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    // onFormSubmit(value1, value2);

    setValue1('');
    setValue2('');

    console.log(value1, value2);
  };

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, set: React.Dispatch<React.SetStateAction<string>>) => {
    set(e.target.value);
  };

  return (
    <div>
      <Dialog fullScreen
              open={open}
              TransitionComponent={Transition}>
        <Toolbar sx={{position: 'relative'}}>
          <IconButton edge="start"
                      color="inherit"
                      aria-label="close"
                      onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <Typography sx={{ml: 2, flex: 1}}
                      variant="h6"
                      component="div">
            Some text
          </Typography>
        </Toolbar>

        <DialogContent>
          <Box component="form"
               onSubmit={handleSubmitForm}>
            <Box sx={{display: 'flex'}}>
              <TextField required
                         label="Word"
                         onChange={e => handleTextFieldChange(e, setValue1)} />
              <TextField required
                         label="Translation"
                         onChange={e => handleTextFieldChange(e, setValue2)} />
            </Box>
            <DialogActions>
              <Button onClick={() => console.log('Cancel clicked')}>
                Cancel
              </Button>
              <Button onClick={() => console.log('Submit clicked')}>
                Submit
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Form;