import style from './PerformerItem.module.scss'

import { Link } from 'react-router-dom';

export default function PerformerItem({ id, name, image_url }: any) {
    return (
        <Link to={`/profile/${id}`}>
            <div className={style.performerItem} id={id}>
                <div className={style.performerImage} style={{ backgroundImage: `url(${image_url ? image_url : 'https://evapkmvcgowyfwuogwbq.supabase.co/storage/v1/object/public/noises_bucket/user_profile_images/default.png'})` }}></div>
                <span>{name}</span>
            </div>
        </Link>
    )
}