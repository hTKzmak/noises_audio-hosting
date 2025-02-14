import style from './PerformerItem.module.scss'

import defaultImage from '../../assets/images/default.png';

export default function PerformerItem({id, artist, image}: any){
    return(
        <div className={style.performerItem} id={id}>
            <div className={style.performerImage} style={{backgroundImage: `url(${image ? image : defaultImage})`}}></div>
            <span>{artist}</span>
        </div>
    )
}