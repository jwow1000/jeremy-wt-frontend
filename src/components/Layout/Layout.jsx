import NavBar from "../Nav/Nav.jsx";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useScrollPosition } from "../../hooks/useUserScreen.jsx";
import styles from "./stylesLayout.module.css";
import { parseSizeToPixels } from "../../services/conversions.js";



function Layout({children}) {
  const [sections, setSections] = useState([]);
  const [mapState, setMapState] = useState(false);
  const [zoomCount, setZoomCount] = useState( 1 );
  const [totalSize, setTotalSize] = useState({
    width: 0,
    height: 0,
  });
  const contentRef = useRef(null)
  const scrollPosition = useScrollPosition();
  

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


  }, [mapState, children, zoomCount]); 

  // this could always be a standard block size, like a map-it div is the same throughout the site?
  // but this could be boring
  // the issue: scale doesnt reflect in the minimap, or readjust position for flex, just shrinks in place
  function zoom( step ) {
    let dir = false;
    if( step < 0 && step > -5 ) {
      dir = 0.75;
    } else if( step > 0 && step < 5) {
      dir = 1.25;
    } else if( step < -5 || step > 5) {
      // dont run the forEach if hit step limit
      return null
    }
    sections.forEach((item) => {
      const computedStyle = getComputedStyle(item);
      console.log('list items', computedStyle.width)
      const w = parseSizeToPixels( computedStyle.width);
      const h = parseSizeToPixels( computedStyle.height);
      const font = parseSizeToPixels( computedStyle.fontSize); 
      item.style.width = `${ w * dir }px`;
      item.style.height = `${ h * dir }px`;
      item.style.fontSize = `${ font * dir }px`;

    })
  }
  
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
        zoomCount={zoomCount}
        setZoomCount={setZoomCount}
        zoom={zoom}
        
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
