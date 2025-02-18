import style from './MusicItem.module.scss'
import classNames from 'classnames';

import defaultImage from '../../assets/images/default.png';
import { useContext } from 'react';
import { Context } from '../../context/Context';

export default function MusicItem({ id, title, artist, artwork, onList }: any) {

    // получение дпнных с app.tsx
    const { data, setCurrentSong, setShowPlayer, setShowMiniPlayer } = useContext(Context)

    function getUrl(id: number) {
        if (data && data.length > 0) {
            const newData = data.flatMap((item: any) => item.music);
            newData.map((elem: any) => {
                if (elem.id === id) {
                    console.log(elem)
                    setCurrentSong(elem)
                    setShowPlayer(true)
                    setShowMiniPlayer(true)
                }
            })
        }
    }

    return (
        <div className={classNames(style.musicItem, onList ? style.onList : '')} id={id} onClick={() => getUrl(id)}>
            <div className={style.musicImage} style={{ backgroundImage: `url(${artwork ? artwork : defaultImage})` }}></div>
            <div className={style.musicInfo}>
                <span>{title}</span>
                <span>{artist}</span>
            </div>
        </div>
    )
}