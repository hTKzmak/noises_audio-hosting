import { useEffect, useState } from 'react'
import MusicItem from '../MusicItem'
import style from './MusicList.module.scss'

export default function MusicList({ data, scrollMusicsRef, onList }: any) {
    const [onlyMusic, setOnlyMusic] = useState([]);

    // фильтрация данных, чтобы оставались только треки для их отображения
    useEffect(() => {
        if (data && data.length > 0) {
            const newData = data.flatMap((item: any) => item.music);
            setOnlyMusic(newData);
        }
    }, [data]);

    return (
        <div className={style.musicList} ref={scrollMusicsRef}>
            {onlyMusic.map((elem: any) => (
                <MusicItem key={elem.id} id={elem.id} title={elem.title} artist={elem.artist} artwork={elem.artwork} url={elem.url} onList={onList} sortedData={onlyMusic}/>
            ))}
        </div>
    )
}