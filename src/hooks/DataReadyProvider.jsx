import { useState } from "react";
import { DataReadyContext } from "./dataReadyContext.jsx";

const DataReadyProvider = ({ children }) => {
  const [dataReady, setDataReady] = useState(false);

  return (
    <DataReadyContext.Provider value={{ dataReady, setDataReady }}>
      {children}
    </DataReadyContext.Provider>
  );
};

export default DataReadyProvider;
