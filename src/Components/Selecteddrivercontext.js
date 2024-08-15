import React, { createContext, useState, useContext } from "react";

const SelectedDriverContext = createContext();

export const SelectedDriverProvider = ({ children }) => {
  const [selectedDriver, setSelectedDriver] = useState(null);

  return (
    <SelectedDriverContext.Provider value={{ selectedDriver, setSelectedDriver }}>
      {children}
    </SelectedDriverContext.Provider>
  );
};

export const useSelectedDriver = () => useContext(SelectedDriverContext);