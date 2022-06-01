import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';

export type TMenuItem = {
  label: string;
  onClick: () => void;
};

type TBarMenuButtonProps = {
  menuItems: TMenuItem[];
};

export const BarMenuButton: React.FC<TBarMenuButtonProps> = ({
  menuItems,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }
  const handleItemClick = (onClick: () => void) => {
    handleClose();
    onClick();
  }

  const menuItemsToRender = menuItems.map((item, i) => (
    <MenuItem
      key={i}
      onClick={() => handleItemClick(item.onClick)}
    >
      {item.label}
    </MenuItem>
  ));

  return (
    <>
      <IconButton
        size="large"
        aria-label="display more actions"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        edge="end"
        color="inherit"
        onClick={handleMenuClick}
      >
        <MoreIcon />
      </IconButton>
      <Menu
        id="bar-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {menuItemsToRender}
      </Menu>
    </>
  );
};
