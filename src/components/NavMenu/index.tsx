import { Link } from "react-router-dom";
import style from './NavMenu.module.scss';

// icons
import homeIcon from '../../assets/icons/navMenu/home.svg';
import exploreIcon from '../../assets/icons/navMenu/explore.svg';
import favoriteIcon from '../../assets/icons/navMenu/favorite.svg';
import artistsIcon from '../../assets/icons/navMenu/artists.svg';
import latestIcon from '../../assets/icons/navMenu/latest.svg';
import libraryIcon from '../../assets/icons/navMenu/library.svg';

import noisesLogo from '../../assets/logo.svg';
import miniLogo from '/noises.svg';
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function NavMenu() {

    // получение данных с app.tsx
    const { localStorageData } = useContext(Context)

    return (
        <div className={style.menu}>

            <div className={style.menuDesktop}>

                <img className={style.logo} src={noisesLogo} alt="Noises" />
                <img className={style.miniLogo} src={miniLogo} alt="Noises" />

                <div className={style.browseMusic}>
                    <ul>
                        <li>
                            <Link to={'/'}><img src={homeIcon} alt="#" /> <span>Home</span></Link>
                        </li>
                        <li>
                            <Link to={'/explore'}><img src={exploreIcon} alt="#" /> <span>Explore</span></Link>
                        </li>
                    </ul>
                    <ul>
                        <h3>Library</h3>
                        <li>
                            <Link to={'/favorite'}><img src={favoriteIcon} alt="#" /> <span>Favorite</span></Link>
                        </li>
                        <li>
                            <Link to={'/artists'}><img src={artistsIcon} alt="#" /> <span>Artists</span></Link>
                        </li>
                        <li>
                            <Link to={'/latest'}><img src={latestIcon} alt="#" /> <span>Latest</span></Link>
                        </li>
                    </ul>
                </div>
            </div>

            <ul className={style.browseMusicMobile}>
                <li>
                    <Link to={'/'}><img src={homeIcon} alt="#" /></Link>
                </li>
                <li>
                    <Link to={'/explore'}><img src={exploreIcon} alt="#" /></Link>
                </li>
                <li>
                    <button onClick={() => alert('library options list')}><img src={libraryIcon} alt="#" /></button>
                </li>
                <li>
                    <Link to={`/profile/${localStorageData.id}`} className={style.user}>
                        <img src={localStorageData ? localStorageData.image_url : 'https://evapkmvcgowyfwuogwbq.supabase.co/storage/v1/object/public/noises_bucket/user_profile_images/default.png'} alt="#" />
                    </Link>
                </li>
            </ul>
        </div>
    )
}