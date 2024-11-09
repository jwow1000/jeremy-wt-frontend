import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
// import RandomBGLines from "../RandomLines/RandomBGLines.jsx";
import MiniMap from "../MiniMap/MiniMap.jsx";
import styles from './stylesNav.module.css';

function Nav({sections, scrollPosition, totalSize, setShowNav, showNav}) {
  const [showMap, setShowMap] = useState(false);
  const [pathSegments, setPathSegments] = useState( [] );
  const [ size, setSize ] = useState({
    width: 0,
    height: 0,
  })

  const handleActive = (act) => {
    return act ? styles.navLinkActive.navLink : styles.navLink
  }

  let location = useLocation();
  const navElem = useRef(null);

  useEffect(() => {
    setPathSegments( location.pathname.split('/').filter(Boolean) );
  },[]);

  


  // const [ navHeight, setNavHeight ] = useState(0); 

  function Hide() {
    return (
      <div
        id={styles.container}
        ref={ navElem }
        style={{}}
      >
      
      {/* <RandomBGLines 
        id="randomLines" 
        reRender={location}
        width={size.width}
        height={size.height}
        wAmount={10}
        hAmount={10}
      /> */}

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
        to="/webprojects"
      > 
        web portfolio
      </NavLink>
      
    </div>
    )
  }
  
  const handleClick = () => {
    setShowNav( (state) => !state );
  }
  
  return (
    <div id={styles.topContainer}>
      {
        showMap &&
          <MiniMap 
            sections={ sections } 
            scrollPosition={ scrollPosition } 
            totalSize={ totalSize }
          />
      }

      <div
        id={styles.showNavButton}
        onClick={ handleClick }
      >
        +
      </div>
      
      <ul id={styles.breadCrumbs}>
        <li>
          <NavLink to="/" className={styles.breadcrumbLink}> 
          <span className={styles.bcBlock}>home</span>/ 
          </NavLink>
        </li>
       
        {
          pathSegments.map( (segment,idx) => (
            <li key={`nav-link-${idx}`}>
              <NavLink 
                to={`/${segment}`} 
                className={styles.breadcrumbLink}
              >
                <span className={styles.bcBlock}>{ segment }</span>/
              </NavLink>
            </li>
          ))
        }
      </ul>
      
      <div 
        id={styles.showMapButton}
        onClick={ () => setShowMap((prev) => !prev) }
      > show map 
      </div>
      
      {
        showNav &&
          <Hide />
      }

    </div>
  )
}

export default Nav