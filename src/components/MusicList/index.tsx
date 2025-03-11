import { useEffect, useState } from 'react'
import MusicItem from '../MusicItem'
import style from './MusicList.module.scss'

export default function MusicList({ data, scrollMusicsRef, onList }: any) {
    const [onlyMusic, setOnlyMusic] = useState([]);

    // фильтрация данных, чтобы оставались только треки для их отображения
    useEffect(() => {
        if (data && data.length > 0) {
            const newData = data.flatMap((item: any) => item.music_tracks);
            setOnlyMusic(newData);
        }
        console.log(onlyMusic)
    }, [data]);

    return (
        <div className={style.musicList} ref={scrollMusicsRef}>
            {onlyMusic.map((elem: any) => (
                <MusicItem key={elem.id} id={elem.id} title={elem.title} artist_name={elem.artist_name} artwork_url={elem.artwork_url} music_url={elem.music_url} onList={onList} sortedData={onlyMusic}/>
            ))}
        </div>
    )
}