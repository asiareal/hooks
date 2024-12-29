import { useEffect } from 'react';
import { useSaved } from './useSaved';

export type EventHandler<E extends Event> = (event: E) => void;

export function useEventListener<E extends Event>(
  type: string,
  handler: EventHandler<E>,
  element: HTMLElement | Window = window,
  options?: boolean | AddEventListenerOptions,
) {
  const savedHandler = useSaved(handler);
  const savedOptions = useSaved(options);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return () => {};

    const eventListener = savedHandler.current;
    const eventOptions = savedOptions.current;

    element.addEventListener(type, eventListener, eventOptions);
    return () => {
      element.removeEventListener(type, eventListener, eventOptions);
    };
  }, [element, savedHandler, savedOptions, type]);
}
