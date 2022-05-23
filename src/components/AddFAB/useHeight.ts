import { useEffect, useRef, useState } from 'react';

/**
 * Used to get element's height. If height changed then result will be recalculated.
 * @param extraProps other extra props. They should be dependent from height or static.
 */
export const useHeight = (extraProps?: string[]) => {
  const ref = useRef<HTMLButtonElement>(null);

  const [height, setHeight] = useState(0);
  const [other, setOther] = useState(
    extraProps?.reduce((acc: any, cur) => (acc[cur] = ''), {}),
  );

  useEffect(() => {
    setHeight(ref?.current?.clientHeight || 0);

    if (extraProps && ref.current) {
      const styles = getComputedStyle(ref?.current);
      let isChanged = false;
      const newOther = { ...other };
      extraProps.forEach((prop) => {
        // @ts-ignore
        if (newOther[prop] !== styles[prop]) {
          isChanged = true;
          // @ts-ignore
          newOther[prop] = styles[prop];
        }
      });
      if (isChanged) {
        setOther(newOther);
      }
    }
  }, [ref?.current?.clientHeight]);

  return { ref, height, other };
};
