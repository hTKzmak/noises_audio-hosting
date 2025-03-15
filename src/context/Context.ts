import { createContext } from "react";

// ха-ха, типизация делает any 
type contextData = {
    data: any;
    localStorageData: any;
    currentSong: any;
    setCurrentSong: any;
    showPlayer: boolean; 
    setShowPlayer: any; 
    showMiniPlayer: boolean; 
    setShowMiniPlayer: any;
    songs: any;
    setSongs: any;
    showContextMenu: any;
    setShowContextMenu: any;
    uploadMusic: boolean;
    setUploadMusic: any;
}

export const Context = createContext<contextData>({ data: [], localStorageData: {}, currentSong: {}, setCurrentSong: {}, showPlayer: false, setShowPlayer: {}, showMiniPlayer: false, setShowMiniPlayer: {}, songs: [], setSongs: {}, showContextMenu: false, setShowContextMenu: {}, uploadMusic: false, setUploadMusic: {}});