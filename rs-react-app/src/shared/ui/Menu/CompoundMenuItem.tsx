import { useMenuContext } from './useMenuContext';
import { MenuItem, type MenuItemProps } from '@mui/material';

export default function CompoundMenuItem({ ...props }: MenuItemProps) {
  const { closeMenu } = useMenuContext();
  const onClick = props.onClick;
  return (
    <MenuItem
      {...props}
      onClick={(event) => {
        if (onClick) onClick(event);
        closeMenu();
      }}
    />
  );
}
