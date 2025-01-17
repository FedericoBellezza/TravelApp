import { createContext, useContext } from "react";
import { persons } from "../db/persons";
import { trips } from "../db/trips";

const TripContext = createContext();

export const TripContextProvider = ({ children }) => {
  return (
    <TripContext.Provider value={{ persons, trips }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTripContext = () => useContext(TripContext);
