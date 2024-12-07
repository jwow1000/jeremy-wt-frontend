import { useState, useEffect, useContext } from 'react';
import { DataReadyContext } from '../../hooks/dataReadyContext.jsx';
import { fetchSounds } from '../../services/fetch';
import styles from "./stylesSounds.module.css";
import appStyles from "../../stylesApp.module.css"





function Sounds( props ) {

  const { dataReady, setDataReady } = useContext(DataReadyContext);
  const [sounds, setSounds] = useState([]); 
  const [clickedVideo, setClickedVideo] = useState(null); // Track which video has been clicked

  useEffect(() => {
    console.log("whaaaaat: ", props)
    const loadPosts = async () => {
      try {
        const data = await fetchSounds();
        setSounds(data);
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
   
      {
        sounds.map( (item, idx) => {
          console.log("look at the sound item: ", item.acf.main_image);
          
          return (
            <div 
              key={`sound-${idx}`}
              className={`${styles.iframeContainer} map-it`}
             
              
            >
              {item.acf.title}
              <iframe src={item.acf.mixcloud} ></iframe>
              <img 
                src={item.acf.main_image.url} 
                alt="" 
                className={styles.radioShowImg}
              /> 
            </div>
          
          )
        })
      }
      

    </div>
  )
}

export default Sounds;