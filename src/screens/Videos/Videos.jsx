import { useState, useEffect } from 'react';
import { fetchVideos } from '../../services/fetch';
import styles from "./stylesVideos.module.css";
import appStyles from "../../stylesApp.module.css"

const vidLinks = [
  "https://www.youtube.com/embed/uAKv80hS3MI",
  "https://www.youtube.com/embed/dt53waP6bAU",
  "https://www.youtube.com/embed/VUsnJllAc3Y",
  "https://www.youtube.com/embed/kYxAFf1hwbw",
  "https://www.youtube.com/embed/w8BYVD6W_ww",
  "https://www.youtube.com/embed/JGGjwgE3sqo",
  "https://www.youtube.com/embed/OpnnBG25MQk",
  "https://www.youtube.com/embed/klxSH5Uv6hw"
]



function Videos() {
  const [videos, setVideos] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchVideos();
        setVideos(data);
      } catch (error) {
        console.error("Failed to load posts", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
    
  }, []);
  return (
    <div id={styles.container} >
      <div className={`${appStyles.header} map-it`}>
        VIDEOS
      </div>
      {
        videos.map((item, idx) =>(
          <div 
            className={`${styles.iframeContainer} map-it`}
            key={`video-cont-${idx}`}
          >
          
            <iframe 
              className={styles.iframe}
              title={item.title.rendered}
              key={`video-${idx}`}
              src={`${item.acf.video_url}`} 
              
            >

            </iframe>
          </div>
        ))
      }
      

    </div>
  )
}

export default Videos;