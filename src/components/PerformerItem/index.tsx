import style from './PerformerItem.module.scss'

import defaultImage from '../../assets/images/default.png';
import { Link } from 'react-router-dom';

export default function PerformerItem({ id, name, image_url }: any) {
    return (
        <Link to={`/profile/${id}`}>
            <div className={style.performerItem} id={id}>
                <div className={style.performerImage} style={{ backgroundImage: `url(${image_url ? image_url : defaultImage})` }}></div>
                <span>{name}</span>
            </div>
        </Link>
    )
}