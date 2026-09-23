import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const isImmediate = !value || (typeof value === 'string' && !value.trim());
    const handler = setTimeout(
      () => {
        setDebouncedValue(value);
      },
      isImmediate ? 0 : delay
    );

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}