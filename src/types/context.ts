export interface Song {
    title: string;
    url: string;
    progress?: number;
    length?: number;
}

export interface UserType {
    id: number;
    name: string;
    email: string;
    password_hash: string;
    image_url: string;
    performer?: boolean;
    favorite_count?: number;
    music_tracks?: any[];
    favorite_music?: any[];
    favorite_artists?: any[];
}

export interface MusicTrack {
    id: number;
    title: string;
    user_id: number;
    artwork_url: string;
    music_url: string;
    genre: string;
    artist_name: string;
    favorite_count: number;
}

export interface ContextData {
    data: UserType[];
    localStorageData: UserType | null;
    currentSong: MusicTrack | null;
    setCurrentSong: (song: MusicTrack | null) => void;
    showPlayer: boolean;
    setShowPlayer: (show: boolean) => void;
    showMiniPlayer: boolean;
    setShowMiniPlayer: (show: boolean) => void;
    songs: Song[];
    setSongs: (songs: Song[]) => void;
    showMenuWindow: boolean;
    setShowMenuWindow: (show: boolean) => void;
    uploadMusic: boolean;
    setUploadMusic: (show: boolean) => void;
    latestMusic: MusicTrack[];
    setLatestMusic: (tracks: MusicTrack[]) => void;
    sessionStorageData: MusicTrack[];
    searchResults: any[];
    setSearchResults: (results: any[]) => void;
}