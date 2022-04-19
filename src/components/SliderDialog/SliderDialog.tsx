import React from 'react';
import { Dialog, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

type TSliderDialogProps = {
  isOpened: boolean;
  children?: React.ReactNode;
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

export const SliderDialog: React.FC<TSliderDialogProps> = ({ isOpened, children }) => (
  <Dialog
    fullScreen
    open={isOpened}
    TransitionComponent={Transition}
  >
    {children}
  </Dialog>
);
