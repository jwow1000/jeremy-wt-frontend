import NavBar from "../Nav/Nav.jsx";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect, useRef, useContext } from "react";
import { DataReadyContext } from "../../hooks/dataReadyContext.jsx";
import { useScrollPosition } from "../../hooks/useUserScreen.jsx";
import styles from "./stylesLayout.module.css";
import { parseSizeToPixels } from "../../services/conversions.js";



function Layout({children}) {
  const { dataReady, setDataReady } = useContext(DataReadyContext);
  const [sections, setSections] = useState([]);
  const [mapState, setMapState] = useState(false);
  const [zoomCount, setZoomCount] = useState( 0 );
  const [totalSize, setTotalSize] = useState({
    width: 0,
    height: 0,
  });
  const contentRef = useRef(null)
  const location = useLocation();
  

  useEffect(() => {
    setDataReady(false);
    // Wait for the component to mount, then select the child main container
    if(contentRef.current && dataReady) {
      const maps = contentRef.current.querySelectorAll('.map-it');
      const mapObjs = Array.from( maps ).map( (item) => {
        // get computed size on load
        const computedStyle = getComputedStyle(item);
        const w = parseSizeToPixels( computedStyle.width);
        const h = parseSizeToPixels( computedStyle.height);
        const font = parseSizeToPixels( computedStyle.fontSize); 
        return {
          'w': w,
          'h': h,
          'font': font,
          'obj': item
        } 
      });

      setSections( mapObjs )

    }
    if (!contentRef.current) return; // Exit if no element is found

    // set the state
    setTotalSize({
      width: contentRef.current.scrollWidth,
      height: contentRef.current.scrollHeight,
    });

    


  }, [mapState, children, dataReady, location]); 

  // this could always be a standard block size, like a map-it div is the same throughout the site?
  // but this could be boring
  // the issue: scale doesnt reflect in the minimap, or readjust position for flex, just shrinks in place
  function zoom( zoomIn ) {
    let newCount = zoomCount;
    
    // if zoomIn is true
    if( zoomIn ) {
      newCount = newCount + 1;
      if(newCount <= 4) {
        setZoomCount( newCount );
      } else {
        return null
      }
    } else {
      newCount = newCount - 1;
      if(newCount >= -4) {
        setZoomCount( newCount );
      } else {
        return null
      }
    }
   
    sections.forEach((item) => {
      const scale = (newCount / 6) + 1;
      console.log("we zoomed?", item.w, scale, item.w * scale)
      console.log("this should stay the same: ", item.w)
      
      item.obj.style.width = `${ item.w * scale }px`;
      item.obj.style.height = `${ item.h * scale }px`;
      item.obj.style.fontSize = `${ item.font * scale }px`;

    })
  }
  
  return (
    <div 
      id={styles.layout}
    >
      
      <NavBar 
        sections={ sections } 
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
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child, { setDataReady }) // Pass `setDataReady` to children
            : child
        )}
        {/* { children } */}
      </div>
      
      

    </div>
  );
}

export default Layout;
