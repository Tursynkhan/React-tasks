import React from 'react';

export interface MenuContextType {
  anchorEl: HTMLElement | null;
  open: boolean;
  openMenu: (el: React.MouseEvent<HTMLElement>) => void;
  closeMenu: () => void;
  menuId: string;
}
const MenuContext = React.createContext<MenuContextType | null>(null);

export default function CompoundMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuId = React.useId();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <MenuContext.Provider
      value={{ anchorEl, open, openMenu, closeMenu, menuId }}
    >
      {children}
    </MenuContext.Provider>
  );
}
export { MenuContext };
