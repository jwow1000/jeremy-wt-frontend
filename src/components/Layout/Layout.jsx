import Nav from "../Nav/Nav.jsx";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useScrollPosition } from "../../hooks/useUserScreen.jsx";
import "./Layout.css";



function Layout(props) {
  const [sections, setSections] = useState([]);
  const [totalSize, setTotalSize] = useState({
    width: 0,
    height: 0,
  });
  const [showNav, setShowNav] = useState( false );
  
  const scrollPosition = useScrollPosition();
  let location = useLocation();

  useEffect(() => {
    // Wait for the component to mount, then select the child elements
    const childElements = document.querySelectorAll('.layout > *');
    
     // Initialize an empty array to store all the `.map-it` elements
    const allMapIts = [];

    // Iterate over each child element and search for `.map-it` elements within them
    childElements.forEach(child => {
      const mapItsInChild = child.querySelectorAll('.map-it');
      // Convert NodeList to array and push into allMapIts
      allMapIts.push(...mapItsInChild);
    });
    
    const totalBig = childElements[0].getBoundingClientRect();
    
    // set the state
    setTotalSize({
      width: childElements[0].scrollWidth,
      height: childElements[0].scrollHeight,
      // width: totalBig.width,
      // height: totalBig.height,
    });

    setSections( allMapIts );
    // You can now manipulate or use these elements as needed.
  }, [location]); // Run this effect once, after the component has mounted

  
 
  return (
    <div 
      id="container-Layout"
      >
      {/* <CaptureScroll maxScroll={4000} onScrollOutputChange={ handleOutput }/> */}
      <div className="section"></div>
      <div 
        style={{"marginLeft": showNav ? "10rem" : "0"}}
        id="body-Layout"
        className="layout" 
      >
        {props.children}
      </div>
      
      <Nav 
        sections={sections} 
        scrollPosition={scrollPosition} 
        totalSize={totalSize} 
        setShowNav={setShowNav}
        showNav={ showNav }
      />

    </div>
  );
}

export default Layout;
