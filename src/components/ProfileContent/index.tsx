import ButtonElem from '../UI/ButtonElem'
import style from './ProfileContent.module.scss'

import { RiHeartFill } from "react-icons/ri";
import { RiHeartLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";

import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { Context } from '../../context/Context';
import MusicList from '../MusicList';
import supabase from '../../config/supabaseClient';

// типизация данных для artistData
type ArtistData = {
    name: string,
    image_url: string,
    music_tracks: any[],
    id: number,
    status: string
}

export default function ProfileContent() {

    // получение дпнных с app.tsx
    const { data, localStorageData, setCurrentSong, setShowMiniPlayer, setSongs, showMenuWindow, setShowMenuWindow, setUploadMusic } = useContext(Context)

    // данные пользователя, которые будут храниться в artistData
    const [artistData, setArtistData] = useState<ArtistData | undefined>();

    // Храним id любимых треков
    const [isFavorite, setIsFavorite] = useState(false)

    // находим с помощью useParams значение id
    const { id } = useParams()

    // находим данные пользователя по id
    useEffect(() => {
        const foundArtist = data.find((elem: any) => elem.id === Number(id));
        if (foundArtist) {
            setArtistData(foundArtist)
            console.log(foundArtist)
        }
    }, [id, data]);


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

    const favoriteFunc = async () => {
        if (id !== localStorageData.id) {
            setIsFavorite(!isFavorite)

            const { data, error } = await supabase
                .from('favorite_artists')
                .insert({ user_id: localStorageData.id, artist_id: Number(id) });

            if (error) {
                console.error('Ошибка при добавлении в избранное:', error);
            } else {
                console.log('Добавлено в избранное:', data);
            }
        }
    }


    return (
        <div className={style.profileContent}>
            <div className={style.userBlock}>
                <img src={artistData ? artistData.image_url : 'https://evapkmvcgowyfwuogwbq.supabase.co/storage/v1/object/public/noises_bucket/user_profile_images/default.png'} alt={artistData ? artistData.name : 'performer_image'} />
                {localStorageData.id == id ? (
                    <p>You</p>
                ) : (
                    <p>{artistData?.status}</p>
                )}
                <h2>{artistData ? artistData.name : ''}</h2>

                <div className={style.options}>
                    <ButtonElem title='Play' func={() => startPlayMusic()} />
                    {localStorageData.id == id && (<button onClick={showUploadMusic}><FiUpload /></button>)}
                    {localStorageData.id == id ? (<Link to={'/settings'}><IoSettingsOutline /></Link>) : (<button onClick={favoriteFunc}>{isFavorite ? <RiHeartFill /> : <RiHeartLine />}</button>)}
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
    )
}