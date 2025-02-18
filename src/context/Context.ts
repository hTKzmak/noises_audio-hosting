import { createContext } from "react";

type contextData = {
    data: any;
    currentSong: any;
    setCurrentSong: any;
    showPlayer: boolean; 
    setShowPlayer: any; 
    showMiniPlayer: boolean; 
    setShowMiniPlayer: any;
}

export const Context = createContext<contextData>({ data: [], currentSong: {}, setCurrentSong: {}, showPlayer: false, setShowPlayer: {}, showMiniPlayer: false, setShowMiniPlayer: {} });