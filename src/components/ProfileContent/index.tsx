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
    const { data, localStorageData, setCurrentSong, setShowMiniPlayer, setSongs, showMenuWindow, setShowMenuWindow, setUploadMusic } = useContext(Context)

    const dispatch = useDispatch();

    // данные пользователя, которые будут храниться в artistData
    const [artistData, setArtistData] = useState<ArtistData | undefined>();

    // Храним id любимых треков
    const [isFavorite, setIsFavorite] = useState(false);

    // находим с помощью useParams значение id
    const { id } = useParams()

    // находим данные пользователя по id
    useEffect(() => {
        const foundArtist = data.find((elem: any) => elem.id === Number(id));
        if (foundArtist) {
            setArtistData(foundArtist)
        }
    }, [id, data]);

    // useEffect для отслеживания избранного
    useEffect(() => {
        const checkIfFavorite = async () => {
            const user = data.find((elem: any) => elem.id === localStorageData.id);
            if (user) {
                setIsFavorite(user.favorite_artists.some((user: any) => user.id === Number(id)))
            }
        };

        checkIfFavorite();
    }, [artistData, localStorageData.id]);


    function startPlayMusic() {
        if (artistData && artistData?.music_tracks.length > 0) {
            setSongs(artistData?.music_tracks)

            setCurrentSong(artistData?.music_tracks[0])
            // будет отображаться еще основной плеер, только если экран будет больше 768px, иначе бкдет отображаться мини-плеер для мобильных устройств
            setShowMiniPlayer(true)
        }
    }

    const showUploadMusic = () => {
        setUploadMusic(true)
        setShowMenuWindow(!showMenuWindow)
    }

    // добавление и удаление музыки в списке отслеживаемых
    const favoriteFunc = async () => {
        const userID = localStorageData.id;
        const isCurrentlyFavorite = isFavorite;

        if (artistData) {
            try {
                if (isCurrentlyFavorite) {
                    // Удаляем из избранного
                    const { error } = await supabase
                        .from('favorite_artists')
                        .delete()
                        .eq('user_id', userID)
                        .eq('artist_id', artistData.id);

                    if (error) throw error;
                } else {
                    // Добавляем в избранное
                    const { error } = await supabase
                        .from('favorite_artists')
                        .insert({ user_id: userID, artist_id: artistData.id });

                    if (error) throw error;
                }

                // Обновляем состояние в Redux
                dispatch(artistToFavorControl({ artistData, userID }));

                // Обновляем локальное состояние
                setIsFavorite(!isCurrentlyFavorite);
            } catch (error) {
                console.error('Error updating favorite:', error);
            }
        }
    };


    return (
        <div className={style.profileContent}>
            <div className={style.userBlock}>
                <div className={style.userImage} style={{ backgroundImage: `url(${artistData?.image_url})` }}></div>

                {localStorageData.id == id ? (
                    <p>You</p>
                ) : (
                    <p>{artistData?.performer ? "Performer" : "User"}</p>
                )}
                <h2>{artistData ? artistData.name : ''}</h2>

                <div className={style.options}>
                    <ButtonElem title='Play' func={startPlayMusic} />
                    {localStorageData.id == id && (
                        <button onClick={showUploadMusic}>
                            <FiUpload />
                        </button>
                    )}
                    {localStorageData.id != id && artistData?.performer && (
                        <button onClick={() => alert('pay')}>
                            <HiOutlineCurrencyDollar />
                        </button>
                    )}
                    {localStorageData.id == id ? (
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
                {artistData && artistData.music_tracks.length > 0 ? (
                    <MusicList onList={false} sortedData={artistData.music_tracks} />
                ) : (
                    <span className={style.noMusicMessage}>There is nothing</span>
                )}
            </div>
        </div>
    );
}