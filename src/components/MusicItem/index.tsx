import style from './MusicItem.module.scss'
import classNames from 'classnames';

import defaultImage from '../../assets/images/default.png';

export default function MusicItem({id, title, artist, artwork, onList}: any){
    return(
        <div className={classNames(style.musicItem, onList ? style.onList : '')} id={id}>
            <div className={style.musicImage} style={{backgroundImage: `url(${artwork ? artwork : defaultImage})`}}></div>
            <div className={style.musicInfo}>
                <span>{title}</span>
                <span>{artist}</span>
            </div>
        </div>
    )
}