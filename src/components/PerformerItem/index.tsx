import style from './PerformerItem.module.scss'

import defaultImage from '../../assets/images/default.png';

export default function PerformerItem(){
    return(
        <div className={style.performer_item}>
            <div className={style.performer_image} style={{backgroundImage: `url(${defaultImage})`}}></div>
            <span>Performer's name</span>
        </div>
    )
}