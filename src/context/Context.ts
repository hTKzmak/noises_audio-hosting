import { createContext } from "react";
import { ContextData } from "../types/context";

export const Context = createContext<ContextData>({
    data: [],
    localStorageData: null,
    currentSong: null,
    setCurrentSong: () => { },
    showPlayer: false,
    setShowPlayer: () => { },
    showMiniPlayer: false,
    setShowMiniPlayer: () => { },
    songs: [],
    setSongs: () => { },
    showMenuWindow: false,
    setShowMenuWindow: () => { },
    uploadMusic: false,
    setUploadMusic: () => { },
    latestMusic: [],
    setLatestMusic: () => { },
    sessionStorageData: [],
    searchResults: [],
    setSearchResults: () => { },
});