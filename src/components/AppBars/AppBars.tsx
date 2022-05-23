import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import { Top } from './Top';

type TAppBarsProps = {
  children: React.ReactNode;
};

export enum BarGuiding {
  back = 'BACK',
}

const barGuiding = (guiding: BarGuiding, onClick: () => void = () => {}) => {
  const guidings = {
    // TODO: may be back btn should include navigate(-1) to not create it in every component
    [BarGuiding.back]: () => (
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={onClick}
      >
        {/* TODO: on IOS should be <ArrowBackIosIcon /> */}
        <ArrowBackIcon />
      </IconButton>
    ),
  };

  return guidings[guiding]() || null;
};

type TBarGuidingFactory = {
  guiding: BarGuiding;
  onClick?: () => void;
};

export const BarGuidingFactory = ({ guiding, onClick }: TBarGuidingFactory) => (
  <>{barGuiding(guiding, onClick)}</>
);

const AppBars = ({ children }: TAppBarsProps) => ({ children });
AppBars.Top = Top;

export default AppBars;
