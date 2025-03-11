import style from './MusicItem.module.scss'
import classNames from 'classnames';

import defaultImage from '../../assets/images/default.png';
import { useContext } from 'react';
import { Context } from '../../context/Context';

export default function MusicItem({ id, title, artist_name, artwork_url, onList, sortedData }: any) {

    // получение данных с app.tsx
    const { data, setCurrentSong, setShowMiniPlayer, setSongs } = useContext(Context)
   
    function startPlayMusic(id: number) {
        if (data && data.length > 0) {
            setSongs(sortedData)

            // находим список музыки
            const newData = data.flatMap((item: any) => item.music_tracks);

            // проходимся по ним
            newData.map((elem: any) => {

                // находим выбранную нами музыку по id
                if (elem.id === id) {
                    console.log(elem)

                    setCurrentSong(elem)

                    // будет отображаться еще основной плеер, только если экран будет больше 768px, иначе бкдет отображаться мини-плеер для мобильных устройств
                    setShowMiniPlayer(true)
                }
            })
        }
    }

    return (
        <div className={classNames(style.musicItem, onList ? style.onList : '')} id={id} onClick={() => startPlayMusic(id)}>
            <div className={style.musicImage} style={{ backgroundImage: `url(${artwork_url ? artwork_url : defaultImage})` }}></div>
            <div className={style.musicInfo}>
                <span>{title}</span>
                <span>{artist_name}</span>
            </div>
        </div>
    )
}