
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataReadyContext } from '../../hooks/dataReadyContext.jsx';
import { fetchThings, getCategoryId } from '../../services/fetch.js';
import { categoryIdToName } from '../../services/conversions.js';
import styles from "./stylesThings.module.css"

function Things() {
  const { dataReady, setDataReady } = useContext(DataReadyContext);
  const [things, setThings] = useState([]); 
  // get all things and show their main-image and title
  // maybe hover gives more info?

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchThings();
        console.log("data", data)
        setThings(data);
      } catch (error) {
        console.error("Failed to load posts", error);
      } finally {
        setDataReady(true);
      }
    };

    loadPosts();
    
  }, []);
  // include date and tags(categories)
    
  return (
    <div id={styles.container}>
      {
        things.map((thing, idx) => (
         
          <Link 
            className={`${styles.thingWrapper} map-it`} 
            key={`thing-${idx}`}
            to={`/things/${thing.slug}`}
          >
            <div className={styles.thingData}>
              <h1 className={styles.title}>{thing.title.rendered}</h1>
              {
                thing.acf &&
                  <h3 className={styles.year}>{thing.acf.year_completed}</h3>
              }
            </div> 
            
            <div className={styles.categories}>
              {
                thing.categories.map((category) => (
                  <h5 
                    className={styles.category}
                    key={`category-${category}`}
                  >{ categoryIdToName(category) }</h5>
                ))
              }
            </div> 
              
           
            
            {
            thing.acf &&
              <div className={styles.thingImageWrapper}>
                <img 
                  src={thing.acf.main_image.url} 
                  alt="" 
                  className={styles.thingImage}
                />
              </div>
            }

          </Link>
        ))
      }
    
    </div>
  )
}

export default Things