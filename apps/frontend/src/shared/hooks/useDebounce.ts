import { useEffect, useState } from "react";

const useDebounce = (value: string, ms = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, ms);

    return () => clearTimeout(timer);
  }, [value, ms]);

  return debouncedValue;
};

export default useDebounce;
