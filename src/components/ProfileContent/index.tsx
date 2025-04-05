import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import ButtonElem from '../UI/ButtonElem';
import style from './ProfileContent.module.scss';
import { Context } from '../../context/Context';
import MusicList from '../MusicList';
import supabase from '../../config/supabaseClient';
import { artistToFavorControl } from '../../features/musicdata';

type ArtistData = {
    name: string;
    image_url: string;
    music_tracks: any[];
    id: number;
    performer: boolean | null;
};

export default function ProfileContent() {

    // получение дпнных с app.tsx
    const {
        data,
        localStorageData,
        setCurrentSong,
        setShowMiniPlayer,
        setSongs,
        showMenuWindow,
        setShowMenuWindow,
        setUploadMusic
    } = useContext(Context);

    const dispatch = useDispatch();

    // данные пользователя, которые будут храниться в artistData
    const [artistData, setArtistData] = useState<ArtistData | null>(null);

    // Храним id любимых треков
    const [isFavorite, setIsFavorite] = useState(false);
    
    // находим с помощью useParams значение id
    const { id } = useParams();

    // Проверка авторизации
    if (!localStorageData || !id) {
        return <div>Please log in</div>;
    }

    // наш id
    const currentUserId = localStorageData.id;
    
    // id пользователя
    const profileUserId = Number(id);

    // проверка на то, что мы перешли на свою страницу
    const isCurrentUser = currentUserId === profileUserId;

    // нахождение данных о пользователе
    useEffect(() => {
        const foundArtist = data.find((elem: any) => elem.id === profileUserId);
        if (foundArtist) {
            setArtistData({
                id: foundArtist.id,
                name: foundArtist.name,
                image_url: foundArtist.image_url,
                music_tracks: foundArtist.music_tracks || [],
                performer: foundArtist.performer ?? null
            });
        }
    }, [id, data, profileUserId]);

    // проекрка на то, является ли пользователь нашим любимым
    useEffect(() => {
        const user = data.find((elem: any) => elem.id === currentUserId);
        if (user?.favorite_artists) {
            setIsFavorite(user.favorite_artists.some((artist: any) => artist.id === profileUserId));
        }
    }, [artistData, currentUserId, data, profileUserId]);

    // запуск музыки
    function startPlayMusic() {
        if (artistData?.music_tracks?.length) {
            setSongs(artistData.music_tracks);
            setCurrentSong(artistData.music_tracks[0]);
            setShowMiniPlayer(true);
        }
    }

    // отобразить окно загрузки музыки
    const showUploadMusic = () => {
        setUploadMusic(true);
        setShowMenuWindow(!showMenuWindow);
    };

    // добавление пользователя в любимые
    const favoriteFunc = async () => {
        if (!artistData) return;

        try {
            if (isFavorite) {
                const { error } = await supabase
                    .from('favorite_artists')
                    .delete()
                    .match({
                        user_id: currentUserId,
                        artist_id: artistData.id
                    });
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('favorite_artists')
                    .insert([{
                        user_id: currentUserId,
                        artist_id: artistData.id
                    }]);
                if (error) throw error;
            }

            dispatch(artistToFavorControl({
                artistData,
                userID: currentUserId
            }));
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error('Error updating favorite:', error);
        }
    };

    // загрузка, если данных пока нет
    if (!artistData) {
        return <div>Loading...</div>;
    }

    return (
        <div className={style.profileContent}>
            <div className={style.userBlock}>
                <div
                    className={style.userImage}
                    style={{ backgroundImage: `url(${artistData.image_url})` }}
                />

                {isCurrentUser ? <p>You</p> : <p>{artistData.performer ? "Performer" : "User"}</p>}
                <h2>{artistData.name}</h2>

                <div className={style.options}>
                    <ButtonElem title='Play' func={startPlayMusic} />
                    {isCurrentUser && (
                        <button onClick={showUploadMusic}>
                            <FiUpload />
                        </button>
                    )}
                    {!isCurrentUser && artistData.performer && (
                        <button onClick={() => alert('pay')}>
                            <HiOutlineCurrencyDollar />
                        </button>
                    )}
                    {isCurrentUser ? (
                        <Link to={'/settings'}>
                            <IoSettingsOutline />
                        </Link>
                    ) : (
                        <button onClick={favoriteFunc}>
                            {isFavorite ? <RiHeartFill /> : <RiHeartLine />}
                        </button>
                    )}
                </div>
            </div>
            <div className={style.musicList}>
                {artistData.music_tracks?.length ? (
                    <MusicList onList={false} sortedData={artistData.music_tracks} />
                ) : (
                    <span className={style.noMusicMessage}>There is nothing</span>
                )}
            </div>
        </div>
    );
}