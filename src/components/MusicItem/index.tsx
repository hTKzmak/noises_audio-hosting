import style from './MusicItem.module.scss'
import classNames from 'classnames';

import defaultImage from '../../assets/images/default.png';

export default function MusicItem(){
    return(
        <div className={classNames(style.musicItem, style.onList)}>
            <div className={style.musicImage} style={{backgroundImage: `url(${defaultImage})`}}></div>
            <div className={style.musicInfo}>
                <span>Music name</span>
                <span>Performer</span>
            </div>
        </div>
    )
}