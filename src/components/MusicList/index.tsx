import MusicItem from '../MusicItem'
import style from './MusicList.module.scss'

export default function MusicList(){
    return(
        <div className={style.music_list}>
            <MusicItem/>
            <MusicItem/>
            <MusicItem/>
            <MusicItem/>
            
            <MusicItem/>
            <MusicItem/>
            <MusicItem/>
            <MusicItem/>

            <MusicItem/>
            <MusicItem/>
            <MusicItem/>
            <MusicItem/>

            <MusicItem/>
            <MusicItem/>
            <MusicItem/>
            <MusicItem/>
        </div>
    )
}