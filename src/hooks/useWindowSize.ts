import { useEffect, useState } from "react";

export function useWindowSize() {
  const [viewPort, setViewPort] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setViewPort({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return viewPort;
}

export type ViewPortType = ReturnType<typeof useWindowSize>;