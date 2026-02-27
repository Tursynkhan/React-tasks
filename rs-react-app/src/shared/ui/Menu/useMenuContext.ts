import React from 'react';
import { MenuContext } from './CompoundMenu';

export function useMenuContext() {
  const context = React.useContext(MenuContext);
  if (!context) throw new Error('Menu component must be in root Menu');
  return context;
}
