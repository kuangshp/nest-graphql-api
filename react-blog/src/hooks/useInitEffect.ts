import React from 'react';

export const useInitEffect = (effect: () => void, deps: unknown[]): void => {
  const isInit = React.useRef(0);
  React.useEffect(() => {
    ++isInit.current;
    if (isInit.current === 2) {
      return effect();
    }
    // eslint-disable-next-line
  }, deps);
};
