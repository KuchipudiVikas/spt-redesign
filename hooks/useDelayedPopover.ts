import { useState, useRef, useCallback } from "react";

const useDelayedPopover = (delay: number = 100) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setIsOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimeout.current = setTimeout(() => {
      setIsOpen(false);
    }, delay);
  }, [delay]);

  return { isOpen, handleMouseEnter, handleMouseLeave };
};

export default useDelayedPopover;
