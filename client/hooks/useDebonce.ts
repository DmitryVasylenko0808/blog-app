import { useRef, useCallback, useEffect } from "react";

export const useDebounce = (
  callback: (...args: any[]) => void,
  delay: number
) => {
  const handlerRef = useRef<any>(null);
  const debouncedCallback = useCallback(
    (...args: any[]) => {
      if (handlerRef.current) {
        clearTimeout(handlerRef.current);
      }
      handlerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  useEffect(() => {
    return () => {
      if (handlerRef.current) {
        clearTimeout(handlerRef.current);
      }
    };
  }, []);

  return debouncedCallback;
};
