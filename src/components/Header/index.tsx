import style from './Header.module.scss';
import { IoSearchOutline } from "react-icons/io5";
import logo from '../../assets/icons/noises_transparent.svg';
import undefinedUser from '../../assets/images/undefined_user.png';
import MiniButton from '../UI/MiniButton';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isProfilePage = pathname.includes('profile');

    return (
        <header className={style.header}>
            {isProfilePage && <MiniButton sign="back" func={() => navigate(-1)} />}
            {!isProfilePage && <img className={style.logo} src={logo} alt="NOISES" />}
            <IoSearchOutline />
            <div className={style.user}>
                <img src={undefinedUser} alt="its you ♡(>ᴗ•)" />
            </div>
        </header>
    );
}
