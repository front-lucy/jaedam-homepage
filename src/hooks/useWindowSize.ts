'use client'

import { useEffect, useState } from "react";

export function useWindowSize() {
  const [viewPort, setViewPort] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setViewPort({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return viewPort;
}

export type ViewPortType = ReturnType<typeof useWindowSize>;