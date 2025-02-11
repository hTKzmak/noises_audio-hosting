import style from './PerformerItem.module.scss'

import defaultImage from '../../assets/images/default.png';

export default function PerformerItem(){
    return(
        <div className={style.performerItem}>
            <div className={style.performerImage} style={{backgroundImage: `url(${defaultImage})`}}></div>
            <span>Performer's name</span>
        </div>
    )
}