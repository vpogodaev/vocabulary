import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

type TQuestionDialog = {
  isOpened: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  onOk: () => void;
  onCancel: () => void;
  okLabel?: string;
  cancelLabel?: string;
};

const Transition = React.forwardRef(
  (
    props: TransitionProps & { children: React.ReactElement },
    ref: React.Ref<unknown>,
  ) => {
    const { children, ...rest } = props;
    return (
      <Slide
        direction="up"
        ref={ref}
        {...rest}
      >
        {children}
      </Slide>
    );
  },
);

const TEXT_CANCEL_BTN = 'Cancel';
const TEXT_OK_BTN = 'Ok';

export const QuestionDialog: React.FC<TQuestionDialog> = ({
  isOpened,
  onClose,
  title,
  description,
  onOk,
  onCancel,
  okLabel,
  cancelLabel,
}) => {
  const titleElement = title ? <DialogTitle>{title}</DialogTitle> : null;
  const descriptionElement = description ? (
    <DialogContent>
      <DialogContentText id="dialog-description">
        {description}
      </DialogContentText>
    </DialogContent>
  ) : null;

  return (
    <div>
      <Dialog
        open={isOpened}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="dialog-description"
      >
        {titleElement}
        {descriptionElement}
        <DialogActions>
          <Button onClick={onCancel}>{cancelLabel ?? TEXT_CANCEL_BTN}</Button>
          <Button onClick={onOk}>{okLabel ?? TEXT_OK_BTN}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
