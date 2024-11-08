import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
// import RandomBGLines from "../RandomLines/RandomBGLines.jsx";
import MiniMap from "../MiniMap/MiniMap.jsx";
import './Nav.css';

function Nav({sections, scrollPosition, totalSize, setShowNav, showNav}) {
  const [showMap, setShowMap] = useState(false);
  const [pathSegments, setPathSegments] = useState( [] );
  const [ size, setSize ] = useState({
    width: 0,
    height: 0,
  })

  const handleActive = (act) => {
    return act ? 'navLinkActive-Nav navLink-Nav' : 'navLink-Nav'
  }

  let location = useLocation();
  const navElem = useRef(null);

  
  
  useEffect(() => {
    setPathSegments( location.pathname.split('/').filter(Boolean) );
    console.log("look at path segs", pathSegments);
  },[]);

  useEffect(() => {
    const updateDimensions = () => {
      if (navElem.current) {
        const { width, height } = navElem.current.getBoundingClientRect();
        console.log("the bounding client: ", width, height)
        setSize({ width, height });
      }
    }

    updateDimensions();

  }, [navElem.current])


  // const [ navHeight, setNavHeight ] = useState(0); 

  function Hide() {
    return (
      <nav 
        id="NavsContainer-Nav" 
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
        id="nav-closeButton"
        onClick={handleClick}
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
      
    </nav>
    )
  }
  
  const handleClick = () => {
    setShowNav( (state) => !state );
  }
  
  return (
    <div id="nav-top-container">
      {
        showMap &&
          <MiniMap 
            sections={sections} 
            scrollPosition={scrollPosition} 
            totalSize={totalSize}
          />
      }

      <div
        id="showNav-button"
        onClick={ handleClick }
      >
        +
      </div>
      
      <ul id="breadCrumbs">
        <li>
          <NavLink to="/" className="breadcrumb-link"> 
          <span className="bc-block">home</span>/ 
          </NavLink>
        </li>
       
        {
          pathSegments.map( (segment) => (
            <li>
              <NavLink 
                to={`/${segment}`} 
                className="breadcrumb-link"
                key={`nav-link-${segment}`}
              >
                <span className="bc-block">{ segment }</span>/
              </NavLink>
            </li>
          ))
        }
      </ul>
      
      <div 
        id="showMap-button"
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