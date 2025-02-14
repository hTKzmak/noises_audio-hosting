import MusicItem from '../MusicItem'
import style from './MusicList.module.scss'

export default function MusicList({ data, scrollMusicsRef }: any) {

    console.log(data)

    return (
        <div className={style.musicList} ref={scrollMusicsRef}>
            {data.map((elem: any) => (
                <MusicItem key={elem.id} id={elem.id} title={elem.title} artist={elem.artist} artwork={elem.artwork} url={elem.url}/>
            ))}
        </div>
    )
}