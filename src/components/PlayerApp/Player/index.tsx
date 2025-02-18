import { useEffect, useRef, useState } from 'react';
import { BsFillPlayCircleFill, BsFillPauseCircleFill, BsFillSkipStartCircleFill, BsFillSkipEndCircleFill } from 'react-icons/bs';
import style from './Player.module.scss'

import volume from '../../../assets/icons/player/volume.svg';
import volumeOff from '../../../assets/icons/player/volume_off.svg';
import volumeHalf from '../../../assets/icons/player/volume_half.svg';
import mixOff from '../../../assets/icons/player/mix_off.svg';
import mixOn from '../../../assets/icons/player/mix_on.svg';
import download from '../../../assets/icons/player/download.svg';
import repeatOff from '../../../assets/icons/player/repeat_off.svg';
import repeatList from '../../../assets/icons/player/repeat_list.svg';
import repeatMusic from '../../../assets/icons/player/repeat_music.svg';
import arrow from '../../../assets/icons/player/arrow.svg';
import classNames from 'classnames';

interface PlayerProps {
    audioElem: any;
    isplaying: boolean;
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    currentSong: any;
    setCurrentSong: React.Dispatch<React.SetStateAction<any>>; // Здесь можно уточнить тип
    mixMusic: boolean;
    setMixMusic: React.Dispatch<React.SetStateAction<boolean>>;
    skipBack: () => void;
    skiptoNext: () => void;
    repeatValue: number;
    setRepeatValue: React.Dispatch<React.SetStateAction<number>>;
    showPlayer: boolean;
    setShowPlayer: React.Dispatch<React.SetStateAction<boolean>>;
    showMiniPlayer: boolean;
    mixSongsFunc: () => void;
}

export default function Player({ audioElem, isplaying, setIsPlaying, currentSong, setCurrentSong, mixMusic, setMixMusic, skipBack, skiptoNext, repeatValue, setRepeatValue, showPlayer, setShowPlayer, showMiniPlayer, mixSongsFunc }: PlayerProps) {
    // место события на разметке (input range)
    const inputRef = useRef<HTMLInputElement | null>(null);

    // громкость музыки
    const volumeRef = useRef<HTMLInputElement | null>(null);

    // показывать ползунок для изменения громкости
    const [showVolume, setShowVolume] = useState(false);

    // значение громкости
    const [volumeCount, setVolumeCount] = useState('1');

    // функция паузы и воспроизведения
    const PlayPause = () => {
        setIsPlaying(!isplaying);
    }

    // проверяет на каком промежутке находится ползунок
    const checkWidth = (e: any) => {
        // отслеживаем значение input range
        const offset = Number(e.target.value);

        // замена значений текущего времени аудио файла на значение ползунка
        audioElem.current.currentTime = offset;

        // Обновляем состояние currentSong
        setCurrentSong({
            ...currentSong,
            progress: offset, // значение ползунка
            length: audioElem.current.duration // Убедимся, что длина актуальна
        });
    }

    // стилизуем фон ползунка
    useEffect(() => {
        if (inputRef.current) {
            const ratio = (Number(inputRef.current.value) / (currentSong.length || 1)) * 100;
            inputRef.current.style.background = `linear-gradient(90deg, #f7f7f7 ${ratio}%, #626262 ${ratio}%)`;
        }
    }, [currentSong.progress, currentSong.length]);
    


    // ОПЦИИ:
    // скачивание файла
    const downloadMusicFunc = async () => {
        const a = document.createElement('a');
        a.href = currentSong.url;
        a.download = currentSong.title; // Укажите нужное имя файла
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    // функционал перемешивания
    const mixMusicList = () => {
        mixSongsFunc()
        setMixMusic(!mixMusic)
    }

    // измение значения repeatValue для 3-х кликов, для повторения воспроизведения музыки
    const repeatChangerFunc = () => {
        switch (repeatValue) {
            case 1:
                setRepeatValue(2)
                break
            case 2:
                setRepeatValue(3)
                break
            case 3:
                setRepeatValue(1)
                break
            default:
                setRepeatValue(1)
                break
        }
    }

    // Отслеживание отображения основного плеера
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && showMiniPlayer) {
                setShowPlayer(true);
            }
            else if (!showMiniPlayer) {
                setShowPlayer(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [setShowPlayer, showMiniPlayer]);

    return (
        <div className={style.player_container} style={{ display: showPlayer ? 'flex' : 'none' }}>
            <button className={style.showingPlayer} onClick={() => setShowPlayer(false)}>
                <img src={arrow} alt="close" />
            </button>
            <div className={style.controls}>
                <button onClick={skipBack}>
                    <BsFillSkipStartCircleFill className={style.btn_action} />
                </button>
                {isplaying ?
                    <button onClick={PlayPause}>
                        <BsFillPauseCircleFill className={classNames(style.btn_action, style.pp)} />
                    </button>
                    :
                    <button onClick={PlayPause}>
                        <BsFillPlayCircleFill className={classNames(style.btn_action, style.pp)} />
                    </button>
                }
                <button onClick={skiptoNext}>
                    <BsFillSkipEndCircleFill className={style.btn_action} />
                </button>
            </div>
            <div className={style.info_and_navigation}>
                <div className={style.music_info}>
                    <img src={currentSong.artwork} alt="#" />
                    <div className={style.music_info_text}>
                        <p className={style.title}>{currentSong.title}</p>
                        <p className={style.artist}>{currentSong.artist}</p>
                    </div>
                </div>
                <input
                    type="range"
                    min={0}
                    max={currentSong.length}
                    value={currentSong.progress || 0}
                    onChange={checkWidth}
                    ref={inputRef}
                />
            </div>
            <div className={style.options}>
                <button onClick={() => setShowVolume(!showVolume)}>
                    {(() => {
                        if (volumeCount === '0') {
                            return (
                                <img src={volumeOff} alt="-" />
                            )
                        } else if (volumeCount <= '0.5') {
                            return (
                                <img src={volumeHalf} alt="+-" />
                            )
                        } else {
                            return (
                                <img src={volume} alt="+" />
                            )
                        }
                    })()}
                </button>

                {showVolume ? (
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volumeCount}
                        ref={volumeRef}
                        onChange={(e) => {
                            audioElem.current.volume = e.target.value
                            setVolumeCount(e.target.value)
                        }}
                    />
                )
                    :
                    (
                        <>
                            <button onClick={() => repeatChangerFunc()}>
                                {(() => {
                                    if (repeatValue === 1) {
                                        return (
                                            <img src={repeatOff} alt="repeat off" />
                                        )
                                    } else if (repeatValue === 2) {
                                        return (
                                            <img src={repeatList} alt="repeat list" />
                                        )
                                    } else {
                                        return (
                                            <img src={repeatMusic} alt="repeat music" />
                                        )
                                    }
                                })()}
                            </button>
                            <button onClick={() => { mixMusicList() }}>
                                {mixMusic === false ? <img src={mixOff} alt="mix off" /> : <img src={mixOn} alt="mix on" />}
                            </button>
                            <button onClick={downloadMusicFunc}>
                                <img src={download} alt="download" />
                            </button>
                        </>
                    )
                }
            </div>
        </div >

    )
}