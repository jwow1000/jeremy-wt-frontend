import NavBar from "../Nav/Nav.jsx";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useScrollPosition } from "../../hooks/useUserScreen.jsx";
import styles from "./stylesLayout.module.css";



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
    // Wait for the component to mount, then select the child main container
    const childElements = document.querySelectorAll('.mapIt-layout > *');
   
    // console.log("the map its: ", childElements[0].querySelectorAll(".map-it"))
     // Initialize an empty array to store all the `.map-it` elements
    const allMapIts = [];

    // Iterate over each child element and search for `.map-it` elements within them
    childElements.forEach(child => {
      const mapItsInChild = child.querySelectorAll(".map-it");
      console.log("are these the mapits?", mapItsInChild);
      // Convert NodeList to array and push into allMapIts
      allMapIts.push(...mapItsInChild);
    });
    
    // const totalBig = childElements[0].getBoundingClientRect();
    
    // set the state
    setTotalSize({
      width: childElements[0].scrollWidth,
      height: childElements[0].scrollHeight,
      // width: totalBig.width,
      // height: totalBig.height,
    });

    setSections( allMapIts );
  
  }, [location]); // Run this effect once, after the component has mounted

  
 
  return (
    <div 
      id={styles.layout}
    >
      <NavBar 
        sections={ sections } 
        scrollPosition={ scrollPosition } 
        totalSize={ totalSize } 
        setShowNav={ setShowNav }
        showNav={ showNav }
        id={styles.navbar}
        
      />

      
      <div 
        style={{"marginLeft": showNav ? "10rem" : "0"}}
        id={styles.content}
        // className="mapIt-layout"
        
      >
        {props.children}
      </div>
      
      

    </div>
  );
}

export default Layout;
