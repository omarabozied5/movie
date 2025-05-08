import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number = 500): T {
  const [debounceValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debounceValue;
}

export default useDebounce;
