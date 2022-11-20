import { useEffect, useRef } from "react";

export function useInterval(callback, delay) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    if (!delay) return;

    const intervalID = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(intervalID);
  }, [delay]);
}
