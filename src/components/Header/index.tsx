import style from './Header.module.scss';
import { IoSearchOutline } from "react-icons/io5";
import logo from '../../assets/icons/noises_transparent.svg';
import MiniButton from '../UI/MiniButton';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';

export default function Header() {

    // получение данных с app.tsx
    const { localStorageData } = useContext(Context)

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const showBackButton = pathname.includes('profile') || pathname.includes('settings') || pathname.includes('search');

    // отображение поиска только для мобильных устройств
    const [showSearch, setShowSearch] = useState(false)

    return (
        <header className={style.header}>
            {showBackButton && <MiniButton sign="back" func={() => navigate(-1)} />}
            {(!showBackButton && !showSearch) && <img className={style.logo} src={logo} alt="NOISES" />}
            <div className={style.search}>
                <IoSearchOutline />
                <input className={style.inputSearch} type="text" name="search" placeholder='Search' />
            </div>
            {!showSearch ? (
                <button className={style.searchButton} onClick={() => setShowSearch(true)}><IoSearchOutline /></button>
            ) : (
                <div className={style.searchMobile}>
                    <MiniButton sign="back" func={() => setShowSearch(false)} />
                    <input className={style.inputSearch} type="text" name="search" placeholder='Search' />
                </div>
            )}
            <Link to={`/profile/${localStorageData.id}`} className={style.user}>
                <div className={style.userImage} style={{ backgroundImage: `url(${localStorageData ? localStorageData.image_url : 'https://evapkmvcgowyfwuogwbq.supabase.co/storage/v1/object/public/noises_bucket/user_profile_images/default.png'})` }}></div>
            </Link>
        </header >
    );
}
