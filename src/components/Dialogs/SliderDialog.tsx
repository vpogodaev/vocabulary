import React from 'react';
import {
  Dialog, DialogActions, DialogContent, IconButton, Slide, Toolbar, Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';

type TSliderDialogProps = {
  isOpened: boolean;
  title: string;
  onCloseClick: () => void;
  content: React.ReactNode;
  actions?: React.ReactNode;
};

const Transition = React.forwardRef((
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) => {
  const { children, ...rest } = props;

  return (
    <Slide
      direction="up"
      ref={ref}
      mountOnEnter
      unmountOnExit
      {...rest}
    >
      {children}
    </Slide>
  );
});

export const SliderDialog: React.FC<TSliderDialogProps> = ({
  isOpened, title, onCloseClick, content, actions,
}) => {
  const dialogActions = actions
    ? <DialogActions>{actions}</DialogActions>
    : null;

  return (
    <Dialog
      fullScreen
      open={isOpened}
      TransitionComponent={Transition}
    >
      <Toolbar sx={{ position: 'relative' }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="close"
          onClick={onCloseClick}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          sx={{ ml: 2, flex: 1 }}
          variant="h6"
          component="div"
        >
          {title}
        </Typography>
      </Toolbar>
      <DialogContent>
        {content}
      </DialogContent>
      {dialogActions}
    </Dialog>
  );
};
