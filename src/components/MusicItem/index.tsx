import style from './MusicItem.module.scss'
import classNames from 'classnames';

import { useContext } from 'react';
import { Context } from '../../context/Context';

import { FiHeart } from "react-icons/fi";
import { FaTrash } from "react-icons/fa6";
import { useLocation } from 'react-router-dom';

export default function MusicItem({ id, title, artist_name, artwork_url, onList, sortedData }: any) {

    // получение данных с app.tsx
    const { data, setCurrentSong, setShowMiniPlayer, setSongs, latestMusic, localStorageData, setLatestMusic } = useContext(Context)

    const { pathname } = useLocation();
    const myProfile = pathname.includes('profile') && pathname.includes(localStorageData.id);

    function startPlayMusic(id: number) {
        if (data && data.length > 0) {
            setSongs(sortedData)

            // находим список музыки
            const newData = data.flatMap((item: any) => item.music_tracks);

            // проходимся по ним
            newData.map((elem: any) => {

                // находим выбранную нами музыку по id
                if (elem.id === id) {
                    // если выбранной музыки нет в списке недавно прослушанных, то добавляем его в список
                    if (!latestMusic.find((music: any) => music.id === elem.id)) {
                        setLatestMusic((prev: any) => [...prev, elem]);
                    }

                    setCurrentSong(elem)

                    // будет отображаться еще основной плеер, только если экран будет больше 768px, иначе бкдет отображаться мини-плеер для мобильных устройств
                    setShowMiniPlayer(true)
                }
            })
        }
    }

    const clickButton = (e: any) => {
        e.stopPropagation();
    }

    return (
        <div className={classNames(style.musicItem, onList ? style.onList : '')} id={id} onClick={() => startPlayMusic(id)}>
            <div className={style.musicImage} style={{ backgroundImage: `url(${artwork_url ? artwork_url : 'https://evapkmvcgowyfwuogwbq.supabase.co/storage/v1/object/public/noises_bucket/artworks/default.png'})` }}></div>
            <div className={style.musicInfo}>
                <span>{title}</span>
                <span>{artist_name}</span>
            </div>
            <div className={style.options}>
                <button onClick={clickButton}><FiHeart /></button>
                {myProfile && <button onClick={clickButton}><FaTrash /></button>}
            </div>
        </div>
    )
}