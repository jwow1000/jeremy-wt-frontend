import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/jwy_logo_24.png";
import MiniMap from "../MiniMap/MiniMap.jsx";
import styles from './stylesNav.module.css';



function Nav({sections, scrollPosition, totalSize, setMapState, mapState, setZoomCount, zoomCount, zoom}) {
  // the states
  const [showNav, setShowNav] = useState(false);
  const [pathSegments, setPathSegments] = useState( [] );
  
  const [ size, setSize ] = useState({
    width: 0,
    height: 0,
  })

  const navElem = useRef(null);
    
  const handleActive = (act) => {
    return act ? `${styles.navLinkActive} ${styles.navLink}` : styles.navLink
  }

  let location = useLocation();

  useEffect(() => {
    setPathSegments( location.pathname.split('/').filter(Boolean) );
  },[location]);
  
  // const [ navHeight, setNavHeight ] = useState(0); 

 
  
  function handleClick() {
    setShowNav( (value) => !value);
  }
  function handleHomeClick() {
    setShowNav( true );
  }

  function handleNavZoom( bool ) {
   

    zoom( bool );
  }

  return (
    <div id={styles.topContainer}>
      {
        mapState &&
          <>
            <MiniMap 
              sections={ sections } 
              scrollPosition={ scrollPosition } 
              totalSize={ totalSize }
              setMapState={setMapState}
              mapState={mapState}
            />
            <div 
              id={styles.mapBackClick}
              onClick={ () => setMapState(false) }
            ></div>
          </>
      }
      <img
        src={logo}
        id={styles.logo}
        onClick={ handleHomeClick}
      /> 
      <div 
        onClick={() => handleNavZoom( false )}
        className={styles.zoomButts}
        id={styles.zoomOut}
      >-</div>

      <div 
        onClick={() => handleNavZoom( true )}
        className={styles.zoomButts}
        id={styles.zoomIn}
      >+</div>
      
      <div
        id={styles.showNavButton}
        className={styles.zoomButts}
        onClick={ handleClick }
      >
       𓃑
      </div>
      
      <div
        className={styles.sideBar}
        ref={ navElem }
        style={{
          transform: showNav ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        {
          showNav &&
            <div 
              id={styles.navBackClick}
              onClick={ () => setShowNav(false) }
            ></div>
        }
        <div 
          id={styles.closeButton}
          onClick={ handleClick }
        >X</div>
        
        <NavLink 
          className={({ isActive }) => (handleActive(isActive))} 
          to="/"
        > 
          home
        </NavLink>
  
        <NavLink 
          className={({ isActive }) => (handleActive(isActive))} 
          to="/things"
        > 
          things/installs
        </NavLink>
  
        <NavLink 
          className={({ isActive }) => (handleActive(isActive))} 
          to="/videos"
        > 
          videos
        </NavLink>
  
        <NavLink 
          className={({ isActive }) => (handleActive(isActive))} 
          to="/sounds"
        > 
          sounds
        </NavLink>
        
        <NavLink 
          className={({ isActive }) => (handleActive(isActive))} 
          to="/webportfolio"
        > 
          web portfolio
        </NavLink>
      
      </div>      

     
      
      <ul id={styles.breadCrumbs}>
        <li>
          <NavLink to="/" className={styles.breadcrumbLink}> 
            /<span className={styles.bcBlock}>home</span>
          </NavLink>
        </li>
       
        {
          pathSegments.map( (segment,idx) => (
            <li key={`nav-link-${idx}`}>
              <NavLink 
                to={`/${segment}`} 
                className={styles.breadcrumbLink}
              >
                /<span className={styles.bcBlock}>{ segment }</span>
              </NavLink>
            </li>
          ))
        }
      </ul>
      
      <div 
        id={styles.showMapButton}
        onClick={ () => setMapState((prev) => !prev) }
      > show map 
      </div>
      
    </div>
  )
}

export default Nav