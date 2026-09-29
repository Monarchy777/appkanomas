import { useEffect, useRef } from 'react';
import { backButtonManager } from '../services/backButtonManager';

/**
 * Hook to handle mobile hardware back button and browser history back events.
 * 
 * @param {Function} handler - Callback to execute when back is pressed
 * @param {boolean} isEnabled - Whether this handler is currently active
 * @param {number} priority - Priority of this handler (higher number = handled first)
 * @param {string} customId - Unique identifier for this handler
 */
export function useBackButton(handler, isEnabled = true, priority = 10, customId = null) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!isEnabled) return;
    const id = customId || `bb_${Math.random().toString(36).substring(2, 9)}`;
    const unregister = backButtonManager.pushHandler(
      id,
      () => {
        if (handlerRef.current) handlerRef.current();
      },
      { priority }
    );

    return () => {
      unregister();
    };
  }, [isEnabled, priority, customId]);
}
