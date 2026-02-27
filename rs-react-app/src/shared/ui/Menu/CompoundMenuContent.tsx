import Menu, { type MenuProps } from '@mui/material/Menu';
import { useMenuContext } from './useMenuContext';

export default function CompoundMenuContent(
  props: Omit<MenuProps, 'anchorEl' | 'open' | 'onClose'>
) {
  const { anchorEl, open, closeMenu, menuId } = useMenuContext();
  return (
    <Menu
      {...props}
      id={props.id ?? menuId}
      anchorEl={anchorEl}
      open={open}
      onClose={closeMenu}
    />
  );
}
