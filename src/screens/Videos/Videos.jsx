import { useState, useEffect, useContext } from 'react';
import { DataReadyContext } from '../../hooks/dataReadyContext.jsx';
import { fetchVideos } from '../../services/fetch';
import { convertVid } from '../../services/conversions.js';
import styles from "./stylesVideos.module.css";
import appStyles from "../../stylesApp.module.css"





function Videos( props ) {
  const { dataReady, setDataReady } = useContext(DataReadyContext);
  const [videos, setVideos] = useState([]); 
  const [clickedVideo, setClickedVideo] = useState(null); // Track which video has been clicked

  useEffect(() => {
    console.log("whaaaaat: ", props)
    const loadPosts = async () => {
      try {
        const data = await fetchVideos();
        setVideos(data);
      } catch (error) {
        console.error("Failed to load posts", error);
      } finally {
        setDataReady(true);
      }
    };

    loadPosts();
    
  }, []);

  const handleImgClick = (videoUrl) => {
    setClickedVideo(videoUrl); // Set clicked video URL to show iframe
  }

  return (
    <div id={styles.container} >
      <div className={`${appStyles.header} map-it`}>
        VIDEOS
      </div>
      {
        videos.map( (item, idx) => {
          const videoUrl = item.acf.video_url;
          return (
            <div 
              key={`video-cont-${idx}`}
              className={`${styles.iframeContainer} map-it`}
              onClick={ () => handleImgClick(videoUrl) }
              
            >
              <h1 className={styles.header}>{item.title.rendered}</h1>
              {
                clickedVideo === videoUrl ? (
                  <iframe 
                    className={styles.iframe}
                    title={item.title.rendered}
                    key={`video-${idx}`}
                    src={`${item.acf.video_url}`} 
                  />
                ) : (

                  <img
                    className={styles.iframe}
                    src={ convertVid( item.acf.video_url ) }
                  />
                )
              }
            
            </div>
          
          )
        })
      }
      

    </div>
  )
}

export default Videos;