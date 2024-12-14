import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { DataReadyContext } from '../../hooks/dataReadyContext.jsx';
import { fetchPost } from '../../services/fetch.js';
import Gallery from '../../components/Gallery/Gallery.jsx';
import styles from "./stylesThingDetail.module.css";

function ThingDetail() {
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
          console.log("postData: ", postData);
        }
      } catch (error) {
        console.error("Failed to load post", error);
      } finally {
        setDataReady(true);
      }
    };

    loadPosts();
    
  }, [slug]);

  // set up the gallery
  useEffect( () => {
    if (postData.acf) {
      const galleryItems = [];
      let count = 1;
      while (postData.acf[`detail_${count}`]) {
        const img = postData.acf[`detail_${count}`];
        galleryItems.push(
          <img className={styles.imgs} src={img.url} key={`gallery-${count}`} />
        );
        count++;
      }
      setGallery(galleryItems); // Update state once
      setDataReady(true);
    }
   
  }, [postData]);
  
  
  return (
    <div className={styles.container} >
      <h1 id={styles.title}>{postData.acf?.title}</h1>
      <h2 id={styles.description}>{postData.acf?.description}</h2>
      <div id={styles.imgsContainer}>
        <Gallery itemsIn={gallery}/>
      </div>  
      

    </div>
  )
}

export default ThingDetail;