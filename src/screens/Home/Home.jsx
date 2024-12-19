import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataReadyContext } from '../../hooks/dataReadyContext.jsx';
import { fetchPosts,getCategoryId } from "../../services/fetch.js";
import webPLogo from "../../assets/webportfolio-logo.svg";
import thingsLogo from "../../assets/things-logo.svg";
import videosLogo from "../../assets/videos-logo.svg";
import soundsLogo from "../../assets/sounds-logo.svg";
import jLogo from "../../assets/jwy_logo_24.svg";
import "./Home.css";

const links = [
  {
    link: "/things",
    text: "things",
    img: thingsLogo
  },
  {
    link: "/videos",
    text: "videos",
    img: videosLogo
  },
  {
    link: "/sounds",
    text: "sounds",
    img: soundsLogo
  },
  {
    link: "/webportfolio",
    text: "web portfolio",
    img: webPLogo
  },
]

function Home() {
  const { dataReady, setDataReady } = useContext(DataReadyContext);
  const [posts, setPosts] = useState([]); 
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error("Failed to load posts", error);
      } finally {
        setDataReady(true);
        setLoading(false);
      }
    };

    loadPosts();
    
  }, []);

  const galleryItems = posts.map( (item, idx) => (
    <div key={idx} className="date">
      {item.date}

      {
        
        item._embedded['wp:featuredmedia'] &&
          
          <img src={ item._embedded['wp:featuredmedia'][0].source_url}></img>
        
      }
      
    </div>

   ));
  function handleHover( idx ) {
    setHoveredIndex(idx);
  }
  function handleLeave() {
    setHoveredIndex(null); 
  }

  return (
    <div id="mainContainer-Home">
      
      {
        links.map( (item, idx) => (
          <Link 
            className='linkLogos-container map-it'
            key={`homeLinks-${idx}`}
            to={item.link} 
            onMouseEnter={() => handleHover( idx )}
            onMouseLeave={handleLeave}
          >
            <img
              src={item.img}
              className="linkLogos"
            />
            <div 
              className='linkLogos-explain'
              style={{
                opacity: hoveredIndex === idx ? 1 : 0,
              }}
            >{item.text}</div>
          </Link>
        ))
      }
      <div id="logoWrapper">
        <img src={jLogo} id="mainLogo"></img>
      </div>
      <div id="bioWrapper">
        Jeremy Wiles-Young is an artist and software engineer working with installation and sound. based in NYC. 
      </div>
      
    </div>
  
  )
}

export default Home;