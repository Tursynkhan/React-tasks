import React from 'react';
import { useMenuContext } from './useMenuContext';
export default function CompoundMenuButton({
  children,
}: {
  children: React.ReactElement<{
    id?: string;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  }>;
}) {
  const buttonId = React.useId();
  const { openMenu } = useMenuContext();
  const onClick = children.props.onClick;
  return React.cloneElement(children, {
    id: children.props.id ?? buttonId,
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      if (onClick) onClick(event);
      openMenu(event);
    },
  });
}
