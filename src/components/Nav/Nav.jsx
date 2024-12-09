import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useScrollPosition } from "../../hooks/useUserScreen.jsx";
import logo from "../../assets/jwy_logo_24.png";
import menu from "../../assets/menu-logo.svg";
import MiniMap from "../MiniMap/MiniMap.jsx";
import styles from './stylesNav.module.css';



function Nav({sections, totalSize, handleMapBack, zoom, mapState, setMapState}) {
  const scrollPosition = useScrollPosition();
  // the states
  const [showNav, setShowNav] = useState(false);
  const [navTop, setNavTop] = useState(false);
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
    console.log("pathsegments", pathSegments)
  },[location]);
  
  // const [ navHeight, setNavHeight ] = useState(0); 

 
  
  function handleClick() {
    setNavTop( true );
    setShowNav( (value) => !value);
  }
  function handleHomeClick() {
    setNavTop( false );
    setShowNav( true );
  }

  function handleNavZoom( bool ) {
    zoom( bool );
  }
 
  let accumulatedPath = ''; // This will hold the accumulated segments for breadcrumb
  
  return (
    <div 
      id={styles.topContainer}
    >
      
      <ul id={styles.breadCrumbs} aria-label="breadcrumb">
        <li>
          <NavLink to="/" className={styles.breadcrumbLink}> 
            /<span className={styles.bcBlock}>home</span>
          </NavLink>
        </li>
       
        {
          pathSegments.map( (segment,idx) => {
            // build the path
            accumulatedPath += `${segment}/`; 
            // console.log("accumulated Path" , segment, accumulatedPath)
            return (
              <li key={`nav-link-${idx}`}>
                <NavLink 
                  to={`/${ accumulatedPath }`} 
                  className={styles.breadcrumbLink}
                >
                  /<span className={styles.bcBlock}>{ segment }</span>
                </NavLink>
              </li>
            )
          })
        }
      </ul>

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
            ></div>
          </>
      }
      

      <div
        
        id={styles.showNavButton}
        className={styles.zoomButts}
        onClick={ handleClick }
      >
        <img src={menu} id={styles.menuImg} alt="show menu button" />
      </div>

      <div
        className={styles.zoomButtsContainer}
      >
        <div 
          onClick={() => handleNavZoom( true )}
          className={styles.zoomButts}
          id={styles.zoomIn}
        >+</div>
        <div 
          onClick={() => handleNavZoom( false )}
          className={styles.zoomButts}
          id={styles.zoomOut}
        >-</div>
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

     
      
      
      
      <div 
        id={styles.showMapButton}
        onClick={ () => setMapState((prev) => !prev) }
      > show map 
      </div>
      
      <img
        src={logo}
        id={styles.logo}
        onClick={ handleHomeClick }
      />  

    </div>
  )
}

export default Nav