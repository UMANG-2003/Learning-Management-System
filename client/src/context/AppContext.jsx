import { createContext } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const value = {
    // Define your context values here
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
