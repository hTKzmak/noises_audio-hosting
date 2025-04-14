import { createContext } from "react";

// ха-ха, типизация any делает бррррррррр
// лучше оставлю всё как есть, потому что если всё исправлять, то всё сломается :(
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

    showMenuWindow: boolean;
    setShowMenuWindow: any;
    showLibraryWin: boolean;
    setShowLibraryWin: any;
    showUploadMusicWin: boolean;
    setShowUploadMusicWin: any;
    showCustomAccWin: boolean; 
    setShowCustomAccWin: any;

    latestMusic: any;
    setLatestMusic: any;

    sessionStorageData: any;

    searchResults: any;
    setSearchResults: any;
}

export const Context = createContext<contextData>({ 
    data: [], localStorageData: {}, 
    
    currentSong: {}, setCurrentSong: {}, 
    
    showPlayer: false, setShowPlayer: {}, showMiniPlayer: false, setShowMiniPlayer: {}, 
    
    songs: [], setSongs: {}, 
    
    showMenuWindow: false, setShowMenuWindow: {}, showLibraryWin: false, setShowLibraryWin: {}, showUploadMusicWin: false, setShowUploadMusicWin: {}, showCustomAccWin: false, setShowCustomAccWin: {}, 
    
    latestMusic: [], setLatestMusic: {}, 
    
    sessionStorageData: [], 
    
    searchResults: '', setSearchResults: {}
});