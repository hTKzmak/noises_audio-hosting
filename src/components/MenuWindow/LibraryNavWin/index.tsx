import style from './LibraryNavWin.module.scss';

import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../../context/Context";
import { IoCloseOutline } from "react-icons/io5";

import { FaUser } from "react-icons/fa6";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { RiHeartFill } from "react-icons/ri";

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
                <Link onClick={() => setShowMenuWindow(!showMenuWindow)} to={'/musics/favorite'}><RiHeartFill/> <span>Favorite music</span></Link>
                <Link onClick={() => setShowMenuWindow(!showMenuWindow)} to={'/artists/favorite'}><FaUser/> <span>Favorite artists</span></Link>
                <Link onClick={() => setShowMenuWindow(!showMenuWindow)} to={'/musics/listened'}><FaArrowRotateLeft/> <span>Listened</span></Link>
            </div>
        </div>
    )
}