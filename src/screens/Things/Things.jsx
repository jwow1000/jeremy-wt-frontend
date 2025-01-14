
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataReadyContext } from '../../hooks/dataReadyContext.jsx';
import { fetchThings, getCategoryId } from '../../services/fetch.js';
import Placeholder from '../../components/Placeholder/Placeholder.jsx';
import { categoryIdToName, categoryNameToId } from '../../services/conversions.js';
import styles from "./stylesThings.module.css"

const theGreen = 'rgb(100, 222, 90)';

function Things() {
  const { dataReady, setDataReady } = useContext(DataReadyContext);
  const [things, setThings] = useState([]); 
  const [filtered, setFiltered] = useState([]); 

  const [keys, setKeys] = useState({
    sculpture: {state: true, name: 'Sculpture', number: 3},
    object: {state: true, name: 'Object', number: 2},
    print: {state: true, name: 'Print', number: 11},
    fabric: {state: true, name: 'Fabric Work', number: 9},
    installation: {state: true, name: 'Installation', number: 10},
    soundSculpture: {state: true, name: 'Sound Sculpture', number: 8},
    sound: {state: true, name: 'Sound', number: 4},
  });
  // get all things and show their main-image and title
  // maybe hover gives more info?

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchThings();
        console.log("data", data)
        setThings(data);
        setFiltered(things);
      } catch (error) {
        console.error("Failed to load posts", error);
      } finally {
        setDataReady(true);
      }
    };

    loadPosts();
    
  }, []);
  
  function setAllKeys( bool ) {
    setKeys((prevKeys) => {
      const updatedKeys = {};
      for (const key in prevKeys) {
        updatedKeys[key] = {
          ...prevKeys[key], // Preserve other properties like `name`
          state: bool,      // Set `state` to true
        };
      }
      return updatedKeys
    });
    filterThings();
  }

  // filter the posts
  function filterThings() {
    
    const filterItems = things.filter( item => {
      return (
        (keys.sculpture.state && item.categories.includes(keys.sculpture.number)) ||
        (keys.object.state && item.categories.includes(keys.object.number)) ||
        (keys.fabric.state && item.categories.includes(keys.fabric.number)) ||
        (keys.print.state && item.categories.includes(keys.print.number)) ||
        (keys.installation.state && item.categories.includes(keys.installation.number)) ||
        (keys.soundSculpture.state && item.categories.includes(keys.soundSculpture.number)) ||
        (keys.sound.state && item.categories.includes(keys.sound.number))
      );
    })
    
    setFiltered(filterItems)
  }

  // include date and tags(categories)
  function handleKeyClick(event) {
    console.log("check out keyCLick: ", event.target);
  
    // Check if the clicked element has the data-matchName attribute
    if (event.target.getAttribute('data-matchName')) {
      const match = event.target.getAttribute('data-matchName');
      if( match !== 'selectAll' && match !== 'seeNone') {
        setKeys((prevKeys) => ({
          ...prevKeys, // Keep all other keys unchanged
          [match]: {
            ...prevKeys[match], // Keep other properties of the matched key unchanged
            state: !prevKeys[match].state, // Toggle the state
          },
        }));
        filterThings();
      } else if(match === 'selectAll') {
        setAllKeys( true );
        filterThings();
      } else {
        setAllKeys( false );
        filterThings();
      }
    }
  } 

  return (
    <div id={styles.container}>
      <div id={`${styles.keyWrapper} map-it`}>
        <h1>Things</h1>
        <div 
          id={styles.keyTagsWrapper}
          onClick={handleKeyClick}
        >
          <button 
            className={styles.keyTag} 
            data-matchName='selectAll'
            key='selectAllButton'
            style={{backgroundColor: 'white'}}
          >
            {`See All`}
          </button> 
          <button 
            className={styles.keyTag} 
            data-matchName='seeNone'
            key='selectAllButton'
            style={{backgroundColor: 'white'}}
          >
            {`See None`}
          </button> 
          {
            Object.entries(keys).map(([key, value]) => (
            (
              <button 
                className={styles.keyTag} 
                data-matchName={key}
                key={`tags for filter${key}`}
                style={{backgroundColor: value.state ? theGreen : 'white'}}
              >
                {`#${value.name}`}
              </button>
            )
          ))
          }
          
        </div>
      </div>
      {
        filtered && filtered.length > 0 ?
          filtered.map((thing, idx) => (
          
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
        : (
          <Placeholder />
        )
      }
    
    </div>
  )
}

export default Things