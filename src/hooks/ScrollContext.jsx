import { createContext, useState, useContext, useRef, useEffect } from 'react';

// Create the context
const ScrollContext = createContext();

// Custom hook to use the scroll context
export const useScroll = () => {
  return useContext(ScrollContext);
};

// Provider component
export const ScrollProvider = ({ children }) => {
  const contentRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        setScrollPosition({
          x: contentRef.current.scrollLeft,
          y: contentRef.current.scrollTop,
        });
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
      handleScroll(); // Initialize scroll position
    }

    // Cleanup on unmount
    return () => {
      if (contentElement) {
        contentElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ contentRef, scrollPosition }}>
      {children}
    </ScrollContext.Provider>
  );
};
