import React from 'react';
import { Top } from './Top';

type TAppBarsProps = {
  children: React.ReactNode;
}

const AppBars = ({ children }: TAppBarsProps) => (
  { children }
);
AppBars.Top = Top;

export default AppBars;
