import { useEffect, useRef, useState } from 'react';

export const useHeight = () => {
  const ref = useRef<HTMLButtonElement>(null);

  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(ref?.current?.clientHeight || 0);
  }, [ref?.current?.clientHeight]);

  return { ref, height };
};
