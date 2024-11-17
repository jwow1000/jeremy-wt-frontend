import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataReadyContext } from '../../hooks/dataReadyContext.jsx';
import { fetchWebProjects } from '../../services/fetch.js';
import styles from "./stylesWprojects.module.css";
import appStyles from "../../stylesApp.module.css"


function WebProjects() {
  const { dataReady, setDataReady } = useContext(DataReadyContext);
  const [projects, setProjects] = useState([]); 

  // const [clickedVideo, setClickedVideo] = useState(null); // Track which video has been clicked

  useEffect(() => {
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

  
  
  return (
    <div id={styles.container} >
      
      {
        projects.map( (item, idx) => {
          
          const styleObject = {
            backgroundImage: `url(${ item.acf.main_image.url})`
          };
          
          return (
            <Link
              className={`${styles.projectContainer} map-it`}
              key={`webproject-${idx}`}
              style={ styleObject }
              to={`/webportfolio/${item.slug}`}
            >
              <h1 className={styles.projectTitle}>{item.acf.title}</h1>
              <div className={styles.description}>
                <p className={styles.descriptionBody}>{item.acf.description}</p>
              </div>

            </Link>
          
          )
        })
      }
      

    </div>
  )
}

export default WebProjects;