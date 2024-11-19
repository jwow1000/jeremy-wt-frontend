import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataReadyContext } from '../../hooks/dataReadyContext.jsx';
import { fetchPosts, fetchVideos } from "../../services/fetch.js";
import Gallery from "../../components/Gallery/Gallery.jsx";
import webPLogo from "../../assets/webportfolio-logo.svg";
import thingsLogo from "../../assets/things-logo.svg";
import videosLogo from "../../assets/videos-logo.svg";
import soundsLogo from "../../assets/sounds-logo.svg";
import "./Home.css";

function Home() {
  const { dataReady, setDataReady } = useContext(DataReadyContext);
  const [posts, setPosts] = useState([]); 
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

  return (
    <div id="mainContainer-Home">
      <Link to="/things">
        <img
          src={thingsLogo}
          className="linkLogos map-it"
        />
      </Link>

      <Link to="/videos">
        <img
          src={videosLogo}
          className="linkLogos map-it"
        />
      </Link>

      <Link to="/sounds">
        <img
          src={soundsLogo}
          className="linkLogos map-it"
        />
      </Link>

      <Link to="/webportfolio">
        <img
          src={webPLogo}
          className="linkLogos map-it"
        />
      </Link>


      

      <div className="gall-cont map-it">

        <Gallery itemsIn={ galleryItems }/>
      </div>

      <div className="gall-cont map-it">

        <Gallery itemsIn={ galleryItems }/>
      </div>

     
      
    </div>
  
  )
}

export default Home;