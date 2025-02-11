import MusicItem from '../MusicItem'
import style from './MusicList.module.scss'

export default function MusicList({scrollMusicsRef}: any) {
    return (
        <div className={style.musicList} ref={scrollMusicsRef}>
            <MusicItem />
            <MusicItem />
            <MusicItem />
            <MusicItem />

            <MusicItem />
            <MusicItem />
            <MusicItem />
            <MusicItem />

            <MusicItem />
            <MusicItem />
            <MusicItem />
            <MusicItem />

            <MusicItem />
            <MusicItem />
            <MusicItem />
            <MusicItem />
        </div>
    )
}