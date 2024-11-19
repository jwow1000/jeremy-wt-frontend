import { fetchPosts, fetchVideos } from "../../services/fetch.js";
import { useEffect, useState } from "react";
import Gallery from "../../components/Gallery/Gallery.jsx";
import "./Home.css";

function Home() {
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
      
      <div className="gall-cont map-it">

        <Gallery itemsIn={ galleryItems }/>
      </div>

      <div className="gall-cont map-it">

        <Gallery itemsIn={ galleryItems }/>
      </div>

     
      <div className="imgContainer-Home map-it">
       
      </div>

     
      
    </div>
  
  )
}

export default Home;