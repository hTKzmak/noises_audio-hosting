import style from './MusicItem.module.scss'
import classNames from 'classnames';

export default function MusicItem({id, title, artist, artwork, url}: any){
    return(
        <div className={classNames(style.musicItem, style.onList)} id={id}>
            <div className={style.musicImage} style={{backgroundImage: `url(${artwork})`}}></div>
            <div className={style.musicInfo}>
                <span>{title}</span>
                <span>{artist}</span>
            </div>
        </div>
    )
}