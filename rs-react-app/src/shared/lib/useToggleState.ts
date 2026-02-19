import React from 'react';

export default function useToggleState(initialState = false) {
  const [state, setState] = React.useState<boolean>(initialState);

  const toggle = React.useCallback(() => setState((prev) => !prev), []);
  const open = React.useCallback(() => setState(true), []);
  const close = React.useCallback(() => setState(false), []);

  const actions = React.useMemo(
    () => Object.assign(toggle, { toggle, open, close }),
    [toggle, open, close]
  );

  return [state, actions] as const;
}
