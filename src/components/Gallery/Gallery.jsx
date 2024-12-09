import { useState, useEffect } from "react";
import styles from "./stylesGallery.module.css";




function Gallery({ itemsIn }) {
  const [slide, setSlide] = useState( 0 );
  const [items, setItems] = useState([]);
  const [itemAmt, setItemAmt] = useState(0);
  const [focused, setFocused ] = useState(false);

  useEffect(() => {
    setItems( itemsIn );
    setItemAmt( items.length );
    console.log("gallery items: ", items)
  }, [itemsIn]);
  
  function handleFocusToggle() {
    setFocused( (prev) => !prev);
  }

  function handleClick( dir ) {
    // if true move up
    if( dir ) {
      if( slide+1 < itemAmt-1 ) {
        setSlide( (prev) => prev + 1 );
      } else {
        setSlide( 0 );
      }
    } else {
      if( slide - 1 > 0 ) {
        setSlide( (prev) => prev - 1 );
      } else {
        setSlide( itemAmt - 1);
      }
    }
  }
  return (
    <>
      <div id={styles.container}>
        <div className={styles.leftClick} onClick={() => handleClick( true )}></div>
        <div className={styles.rightClick} onClick={() => handleClick( false )}></div>
        <div className={styles.centerClick} onClick={ handleFocusToggle }></div>
        <div 
          className={styles.buttons} 
          id={styles.left}
          onClick={() => handleClick( true )}
        > ↜ 
        </div>
        <div 
          className={styles.buttons} 
          id={styles.right}
          onClick={() => handleClick( false )}
        > ↝ 
        </div>
        <div className={styles.galleryItem}>
          {items[slide]}
        </div>

        
      </div>

      {
        focused &&
          <div id={styles.focusMainContainer} onClick={handleFocusToggle}>
            <div id={styles.focusContain}>
              {items[slide]} 
            </div>

          </div>
      }
    </>
  )
}

export default Gallery