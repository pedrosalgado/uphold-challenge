import { useEffect } from 'react';

/**
 * A reusable debounce hook.
 * @param {Function} callback - The function to debounce.
 * @param {number} delay - The debounce delay in milliseconds.
 * @param {Array} dependencies - Dependencies for the effect to watch.
 */
export const useDebounce = (callback, delay, dependencies) => {
  useEffect(() => {
    // Set a timeout to call the callback
    const handler = setTimeout(() => {
      callback();
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [...dependencies]); // Spread dependencies so they are watched
};
