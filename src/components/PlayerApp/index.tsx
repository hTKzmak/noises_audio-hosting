import { useContext, useEffect, useRef, useState } from "react";
import Player from "./Player";
import MiniPlayer from "./MiniPlayer";
import { Context } from "../../context/Context";

export interface MusicTrack {
    id: number;
    title: string;
    user_id: number;
    artwork_url: string;
    music_url: string;
    genre: string;
    artist_name: string;
    favorite_count: number;
    progress?: number;
    length?: number;
}

type PlayerState = {
    currentSong: MusicTrack | null;
    progress: number;
    length: number;
    // другие свойства состояния плеера
};


export default function PlayerApp({ data }: { data: any }) {
    const { 
        currentSong, 
        setCurrentSong, 
        showPlayer, 
        setShowPlayer, 
        showMiniPlayer, 
        setShowMiniPlayer, 
        songs, 
        setSongs 
    } = useContext(Context);

    // Добавляем проверку на null
    if (!currentSong) {
        return null;
    }

    const [playerState, setPlayerState] = useState<PlayerState>({
        currentSong: null,
        progress: 0,
        length: 0
    });

    const [isplaying, setIsPlaying] = useState<boolean>(false);
    const [mixMusic, setMixMusic] = useState<boolean>(false);
    const [mixSongsdata, setMixSongsdata] = useState<MusicTrack[]>([]);
    const [repeatValue, setRepeatValue] = useState<number>(1);
    const audioElem = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (data?.length) {
            const newData = data.flatMap((item: any) => item.music_tracks || []);
            setSongs(newData);
        }
    }, [data, setSongs]);

    const mixSongsFunc = () => {
        const arrayCopy = [...songs];
        for (let i = arrayCopy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
        }
        setMixSongsdata(arrayCopy);
    };

    useEffect(() => {
        if (audioElem.current) {
            isplaying ? audioElem.current.play() : audioElem.current.pause();
        }
    }, [isplaying, currentSong]);

    const onPlaying = () => {
        if (audioElem.current && playerState.currentSong) {
            setPlayerState({
                ...playerState,
                progress: audioElem.current.currentTime,
                length: audioElem.current.duration
            });
        }
    };

    const skipBack = () => {
        const songList = mixMusic ? mixSongsdata : songs;
        const index = songList.findIndex(x => x.id === currentSong.id);
        
        const newSong = index <= 0 
            ? songList[songList.length - 1] 
            : songList[index - 1];
        
        setCurrentSong(newSong);
        if (audioElem.current) audioElem.current.currentTime = 0;
    };

    const skiptoNext = () => {
        const songList = mixMusic ? mixSongsdata : songs;
        const index = songList.findIndex(x => x.id === currentSong.id);
        
        const newSong = index >= songList.length - 1 
            ? songList[0] 
            : songList[index + 1];
        
        setCurrentSong(newSong);
        if (audioElem.current) audioElem.current.currentTime = 0;
    };

    const repeatMusicFunc = () => {
        const index = songs.findIndex(x => x.id === currentSong.id);
        switch (repeatValue) {
            case 1:
                if (index === songs.length - 1) setIsPlaying(false);
                else skiptoNext();
                break;
            case 2:
                skiptoNext();
                break;
            case 3:
                setCurrentSong(songs[index]);
                break;
            default:
                skiptoNext();
                break;
        }
    };

    return (
        <div>
            <audio
                src={currentSong.music_url}
                ref={audioElem}
                onTimeUpdate={onPlaying}
                onEnded={() => {
                    if (mixMusic) skiptoNext();
                    repeatMusicFunc();
                }}
            />

            <MiniPlayer
                isplaying={isplaying}
                setIsPlaying={setIsPlaying}
                currentSong={currentSong}
                setShowPlayer={setShowPlayer}
                showMiniPlayer={showMiniPlayer}
                setShowMiniPlayer={setShowMiniPlayer}
            />

            <Player
                isplaying={isplaying}
                setIsPlaying={setIsPlaying}
                audioElem={audioElem}
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
                mixMusic={mixMusic}
                setMixMusic={setMixMusic}
                skipBack={skipBack}
                skiptoNext={skiptoNext}
                repeatValue={repeatValue}
                setRepeatValue={setRepeatValue}
                showPlayer={showPlayer}
                setShowPlayer={setShowPlayer}
                showMiniPlayer={showMiniPlayer}
                mixSongsFunc={mixSongsFunc}
            />
        </div>
    )
}