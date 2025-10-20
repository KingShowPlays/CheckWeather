"use client"
import { createContext, useContext, useState } from "react";
const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
    const [currentDeg, setCurrentDeg] = useState('celcius')
    const [currentWind, setWind] = useState('km/h')
    const [currentPrec, setCurrentPrec] = useState('mm')

    const contextValues = {
        currentDeg,
        setCurrentDeg,
        currentWind,
        setWind,
        currentPrec,
        setCurrentPrec
    }
    return (
        <StateContext.Provider value={contextValues}>
            {children}
        </StateContext.Provider>
    );
}
export const useStateContext = () => useContext(StateContext);
