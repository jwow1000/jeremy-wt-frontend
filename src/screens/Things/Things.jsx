
import { useState, useEffect, useContext } from 'react';
import { DataReadyContext } from '../../hooks/dataReadyContext.jsx';
import { fetchThings, getCategoryId } from '../../services/fetch.js';
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
  return (
    <div id={styles.container}>
      {
        things.map((thing, idx) => (
          <div className={styles.thingWrapper} key={`thing-${idx}`}>
            <h1>{thing.title}</h1>

          </div>
        ))
      }
    
    </div>
  )
}

export default Things