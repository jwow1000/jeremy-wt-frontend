import NavBar from "../Nav/Nav.jsx";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useScrollPosition } from "../../hooks/useUserScreen.jsx";
import styles from "./stylesLayout.module.css";



function Layout({children}) {
  const [sections, setSections] = useState([]);
  const [mapState, setMapState] = useState(false);
  const [totalSize, setTotalSize] = useState({
    width: 0,
    height: 0,
  });
  const contentRef = useRef(null)
  const scrollPosition = useScrollPosition();
  
  // useEffect(() => {
  //   if (contentRef.current) {
  //     // Query all .map-it elements within contentRef
  //     const foundMapItems = contentRef.current.querySelector('.mapIt-layout');
  //     // setMapItems(Array.from(foundMapItems)); // Convert NodeList to array for easier use
  //     console.log("All .map-it elements found:", foundMapItems);
  //   }
  // }, [children]); // Run this effect whenever `children` change

  useEffect(() => {
    // Wait for the component to mount, then select the child main container
    if(contentRef.current) {
      const maps = contentRef.current.querySelectorAll('.map-it');
      setSections( Array.from( maps ) )

    }
    if (!contentRef.current) return; // Exit if no element is found

    // set the state
    setTotalSize({
      width: contentRef.current.scrollWidth,
      height: contentRef.current.scrollHeight,
    });

  }, [mapState, children]); // Run this effect once, after the component has mounted

  
  return (
    <div 
      id={styles.layout}
    >
      <NavBar 
        sections={ sections } 
        scrollPosition={ scrollPosition } 
        totalSize={ totalSize }
        mapState={mapState}
        setMapState={setMapState}
        id={styles.navbar}
        
      />

      
      <div 
        id={styles.content}
        ref={ contentRef }
        className="mapIt-layout"
        
      >
        { children }
      </div>
      
      

    </div>
  );
}

export default Layout;
