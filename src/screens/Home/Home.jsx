import { fetchPosts, fetchVideos } from "../../services/fetch.js";
import { useEffect, useState } from "react";
import "./Home.css";

function Home() {
  const [posts, setPosts] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchVideos();
        setPosts(data);
      } catch (error) {
        console.error("Failed to load posts", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
    
  }, []);


  return (
    <div id="mainContainer-Home">
      POOOP

      {  
       posts.map( (item, idx) => (
        <div key={idx} className="date">
          {item.date}

          {
            
            item._embedded['wp:featuredmedia'] &&
              
              <img src={ item._embedded['wp:featuredmedia'][0].source_url}></img>
            
          }
          
        </div>

       ))
         

      }
      <div className="imgContainer-Home map-it">
       
      </div>

     
      
    </div>
  
  )
}

export default Home;