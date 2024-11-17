import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { DataReadyContext } from '../../hooks/dataReadyContext.jsx';
import { fetchPost } from '../../services/fetch.js';
import styles from "./stylesWPdetail.module.css";

function WebProjectsDetail() {
  const { slug } = useParams();
  const { dataReady, setDataReady } = useContext(DataReadyContext);
  const [postData, setPostData] = useState({});

  // const [clickedVideo, setClickedVideo] = useState(null); // Track which video has been clicked

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPost( slug );
        setPostData(data);
      } catch (error) {
        console.error("Failed to load posts", error);
      } finally {
        setDataReady(true);
      }
    };

    loadPosts();
    
  }, [slug]);

  
  
  return (
    <div id={styles.container} >
      {slug}
      

    </div>
  )
}

export default WebProjectsDetail;