import { useState, useEffect, useContext } from 'react';
import { DataReadyContext } from '../../hooks/dataReadyContext.jsx';
import { fetchWebProjects } from '../../services/fetch.js';
import styles from "./stylesWprojects.module.css";
import appStyles from "../../stylesApp.module.css"


function WebProjects( props ) {
  const { dataReady, setDataReady } = useContext(DataReadyContext);
  const [projects, setProjects] = useState([]); 
  // const [clickedVideo, setClickedVideo] = useState(null); // Track which video has been clicked

  useEffect(() => {
    console.log("whaaaaat: ", props)
    const loadPosts = async () => {
      try {
        const data = await fetchWebProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to load posts", error);
      } finally {
        setDataReady(true);
      }
    };

    loadPosts();
    
  }, []);

  // const handleImgClick = (videoUrl) => {
  //   setClickedVideo(videoUrl); // Set clicked video URL to show iframe
  // }

  return (
    <div id={styles.container} >
      
      {
        projects.map( (item, idx) => {
          
          const styleObject = {
            backgroundImage: `url(${ item.acf.main_image.url})`
          };
          
          return (
            <div
              className={`${styles.projectContainer} map-it`}
              key={`webproject-${idx}`}
              style={ styleObject }
            >
              <h1 className={styles.projectTitle}>{item.acf.title}</h1>
                

            </div>
          
          )
        })
      }
      

    </div>
  )
}

export default WebProjects;