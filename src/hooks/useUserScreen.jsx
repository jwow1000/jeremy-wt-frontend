import { useEffect, useState } from 'react';

export function useScrollPosition( ) {
  const [scrollPosition, setScrollPosition] = useState( {x: 0, y: 0 } );

  useEffect(() => {
    const handleScroll = () => {
      
      // console.log("client posoitoons: ", obj)
      setScrollPosition({ 
        x: window.scrollX,
        y: window.scrollY,
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
}


// Hook to track the client window's size
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize; // Return the current window width and height
}


export function useTotalSize() {
  const [totalSize, setTotalSize] = useState({
    width: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setTotalSize({
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
      });
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return totalSize; // Return the current window width and height
}
