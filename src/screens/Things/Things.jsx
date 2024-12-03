
import { useState, useEffect, useContext } from 'react';
import { DataReadyContext } from '../../hooks/dataReadyContext.jsx';
import styles from "./stylesThings.module.css"

function Things() {
  const { dataReady, setDataReady } = useContext(DataReadyContext);
  const [things, setThings] = useState([]); 

  return (
    <div>
      Things
    </div>
  )
}

export default Things