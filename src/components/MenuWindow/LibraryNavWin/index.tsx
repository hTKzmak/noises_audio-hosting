import style from './LibraryNavWin.module.scss';

import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../../context/Context";
import { IoCloseOutline } from "react-icons/io5";

import favoriteIcon from '../../../assets/icons/navMenu/favorite.svg';
import artistsIcon from '../../../assets/icons/navMenu/artists.svg';
import latestIcon from '../../../assets/icons/navMenu/latest.svg';

// отдельное окно, предназначенное для навигации по разделу library в мобильной версии
export default function LibraryNavWin() {

    // получение состояний с app.tsx
    const { showMenuWindow, setShowMenuWindow, uploadMusic } = useContext(Context)

    // Отслеживание отображения основного плеера
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024 && !uploadMusic) {
                setShowMenuWindow(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [showMenuWindow, uploadMusic]);


    return (
        <div className={style.winMenu}>
            <div className={style.winHeader}>
                <h3>Library</h3>
                <button onClick={() => setShowMenuWindow(!showMenuWindow)}><IoCloseOutline /></button>
            </div>
            <div className={style.libraryNavigation}>
                <Link onClick={() => setShowMenuWindow(!showMenuWindow)} to={'/favorite'}><img src={favoriteIcon} alt="#" /> <span>Favorite</span></Link>
                <Link onClick={() => setShowMenuWindow(!showMenuWindow)} to={'/artists'}><img src={artistsIcon} alt="#" /> <span>Artists</span></Link>
                <Link onClick={() => setShowMenuWindow(!showMenuWindow)} to={'/latest'}><img src={latestIcon} alt="#" /> <span>Latest</span></Link>
            </div>
        </div>
    )
}