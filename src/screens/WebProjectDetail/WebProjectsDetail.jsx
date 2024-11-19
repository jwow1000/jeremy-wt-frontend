import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { DataReadyContext } from '../../hooks/dataReadyContext.jsx';
import { fetchPost } from '../../services/fetch.js';
import styles from "./stylesWPdetail.module.css";

function WebProjectsDetail() {
  const { slug } = useParams();
  const { dataReady, setDataReady } = useContext(DataReadyContext);
  const [gallery, setGallery] = useState([]);
  const [postData, setPostData] = useState({});

  // const [clickedVideo, setClickedVideo] = useState(null); // Track which video has been clicked

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPost( slug );
        if( data.length > 0){
          setPostData( data[0] );
        }
      } catch (error) {
        console.error("Failed to load posts", error);
      } finally {
        
        setDataReady(true);
      }
    };

    loadPosts();
    
  }, [slug]);

  // set up the gallery
  useEffect( () => {
    if (postData && postData.acf) {
      let count = 1;
      while (postData.acf[`detail_${count}`]) {
        setGallery((prev) => [...prev, postData.acf[`detail_${count}`]]);
        count++; // Increment the counter to avoid infinite loop
      }
      setDataReady(true);
    }
  }, [postData]);
  
  
  return (
    <div id={styles.container} >
      <h1 id={styles.title}>{postData.acf?.title}</h1>
      <div id={styles.imgsContainer}>
        {
          gallery.forEach((item, idx) => (
            <img className={styles.imgs} src={item} key={`gallery-${idx}`}></img>
          ))
        }
      </div>  
      

    </div>
  )
}

export default WebProjectsDetail;