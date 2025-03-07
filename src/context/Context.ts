import { createContext } from "react";

// ха-ха, типизация делает any 
type contextData = {
    data: any;
    currentSong: any;
    setCurrentSong: any;
    showPlayer: boolean; 
    setShowPlayer: any; 
    showMiniPlayer: boolean; 
    setShowMiniPlayer: any;
    songs: any;
    setSongs: any;
}

export const Context = createContext<contextData>({ data: [], currentSong: {}, setCurrentSong: {}, showPlayer: false, setShowPlayer: {}, showMiniPlayer: false, setShowMiniPlayer: {}, songs: [], setSongs: {} });