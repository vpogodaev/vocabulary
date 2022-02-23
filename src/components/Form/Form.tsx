import React, { FormEvent, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';

import styles from './Form.module.scss';
import { INewWord } from '../../models/interfaces/IWord';

declare type TFormProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (newWord: INewWord) => void;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up"
                ref={ref}
                mountOnEnter
                unmountOnExit
                {...props} />;
});

const Form: React.FC<TFormProps> = ({open, onClose, onSubmit}): JSX.Element => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({value1, value2});

    setValue1('');
    setValue2('');

    onClose();
  };

  const handleCancelClicked = () => {
    onClose();
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
               onSubmit={handleSubmitForm}
               id="wordInputForm">
            <Box className={styles.inputsWrapper}>
              <TextField required
                         label="Word"
                         className={styles.longInput}
                         value={value1}
                         onChange={e => handleTextFieldChange(e, setValue1)} />
              <TextField required
                         label="Translation"
                         className={styles.longInput}
                         value={value2}
                         onChange={e => handleTextFieldChange(e, setValue2)} />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClicked}>
            Cancel
          </Button>
          <Button type="submit"
                  form="wordInputForm">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Form;