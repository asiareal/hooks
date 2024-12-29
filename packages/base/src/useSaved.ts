import { useRef } from 'react';

export function useSaved<T>(value: T): React.MutableRefObject<T> {
  const saved = useRef<T>(value);
  saved.current = value;
  return saved;
}
