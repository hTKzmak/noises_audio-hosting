import { useContext, useEffect, useRef, useState } from "react";
import Player from "./Player";
import MiniPlayer from "./MiniPlayer";
import { Context } from "../../context/Context";

interface Song {
    title: string;
    url: string;
    progress?: number;
    length?: number;
}

export default function PlayerApp({ data }: any) {

    // получение дпнных с app.tsx
    const { currentSong, setCurrentSong, showPlayer, setShowPlayer, showMiniPlayer, setShowMiniPlayer, songs, setSongs } = useContext(Context)

    // фильтрация данных, чтобы оставались только треки для их отображения
    useEffect(() => {
        if (data && data.length > 0) {
            const newData = data.flatMap((item: any) => item.music);
            setSongs(newData);
        }
    }, [data]);

    // играет ли музыка
    const [isplaying, setIsPlaying] = useState<boolean>(false);

    // перемешивать список музыки (true - да; false - нет)
    const [mixMusic, setMixMusic] = useState<boolean>(false);

    // массив с перемешанными индексами музыки
    const [mixSongsdata, setMixSongsdata] = useState<Song[]>([]);

    // повторение музыки (1 - не повторяется ни список, ни музыка; 2 - повторяется только список; 3 - повторяется только трек)
    const [repeatValue, setRepeatValue] = useState<number>(1);

    // место события на разметке (audio тег)
    const audioElem = useRef<HTMLAudioElement | null>(null);



    // Одна из опций плеера: перемешивание музыки (данные songsdata)
    const mixSongsFunc = () => {
        let arrayCopy = [...songs];
        for (let i = arrayCopy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
        }
        setMixSongsdata(arrayCopy);
        console.log(arrayCopy)
    }

    // воспроизведение и остановка музыки
    useEffect(() => {
        if (audioElem.current) {
            isplaying ? audioElem.current.play() : audioElem.current.pause();
        }
    }, [isplaying, currentSong]);

    // функция по обновлению времени музыки
    const onPlaying = () => {
        if (audioElem.current) {
            const duration = audioElem.current.duration || 0;
            const ct = audioElem.current.currentTime || 0;
            setCurrentSong((prev: any) => ({ ...prev, progress: ct, length: duration }));
        }
    };

    // пропуск музыки на предыдущую музыку
    const skipBack = () => {
        if (mixMusic) {
            const index = mixSongsdata.findIndex((x: Song) => x.title === currentSong.title);
            if (index === 0) {
                setCurrentSong(mixSongsdata[mixSongsdata.length - 1])
            }
            else {
                setCurrentSong(mixSongsdata[index - 1])
            }
        }
        else {
            const index = songs.findIndex((x: Song) => x.title === currentSong.title);
            if (index === 0) {
                setCurrentSong(songs[songs.length - 1])
            }
            else {
                setCurrentSong(songs[index - 1])
            }
        }

        if (audioElem.current) audioElem.current.currentTime = 0;
    }

    // пропуск музыки на следующую музыку
    const skiptoNext = () => {

        if (mixMusic) {
            const index = mixSongsdata.findIndex((x: Song) => x.title === currentSong.title);
            if (index === mixSongsdata.length - 1) {
                setCurrentSong(mixSongsdata[0]);
            } else {
                setCurrentSong(mixSongsdata[index + 1]);
            }
        }
        // Если перемешивание выключено, переходим к следующей песне
        else {
            const index = songs.findIndex((x: Song) => x.title === currentSong.title);
            if (index === songs.length - 1) {
                setCurrentSong(songs[0]);
            } else {
                setCurrentSong(songs[index + 1]);
            }
        }

        if (audioElem.current) audioElem.current.currentTime = 0; // Сброс времени проигрывания
    };


    // функционал повторения музыки
    const repeatMusicFunc = () => {
        const index = songs.findIndex((x: Song) => x.title === currentSong.title);
        switch (repeatValue) {
            // первая опция: если индекс последней музыки равен длине всего списка музыки, то музыка останавливается
            case 1:
                if (index === songs.length - 1) setIsPlaying(false);
                else skiptoNext();
                break;

            // вторая опция: будет заново воспроизводиться весь список музыки
            case 2:
                skiptoNext();
                break;

            // третья опция: будет заново воспроизводиться только конкретная музыка
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
                data={data}
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