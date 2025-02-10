import style from './MusicItem.module.scss'

import defaultImage from '../../assets/images/default.png';

export default function MusicItem(){
    return(
        <div className={style.music_item}>
            <div className={style.music_image} style={{backgroundImage: `url(${defaultImage})`}}></div>
            <div className={style.music_info}>
                <span>Music name</span>
                <span>Performer</span>
            </div>
        </div>
    )
}