import MusicItem from '../MusicItem';
import ButtonElem from '../UI/ButtonElem'
import style from './ProfileContent.module.scss'

import { FiHeart } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";

import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { Context } from '../../context/Context';

// типизация данных для artistData
type ArtistData = {
    name: string,
    image_url: string,
    music_tracks: any[],
    id: number,
}

export default function ProfileContent() {

    // получение дпнных с app.tsx
    const { data, localStorageData, setCurrentSong, setShowMiniPlayer, setSongs, setShowContextMenu } = useContext(Context)

    // данные пользователя, которые будут храниться в artistData
    const [artistData, setArtistData] = useState<ArtistData | undefined>();

    // находим с помощью useParams значение id
    const { id } = useParams()

    // находим данные пользователя по id
    useEffect(() => {
        const foundArtist = data.find((elem: any) => elem.id === Number(id));
        console.log(foundArtist)
        if (foundArtist) {
            setArtistData(foundArtist)

            // ОТОБРАЖЕНИЕ СПИСКА МУЗЫКИ В КОНСОЛЕ
            console.log(foundArtist.music_tracks)
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


    return (
        <div className={style.profileContent}>
            <div className={style.userBlock}>
                <img src={artistData ? artistData.image_url : 'https://evapkmvcgowyfwuogwbq.supabase.co/storage/v1/object/public/noises_bucket/user_profile_images/default.png'} alt={artistData ? artistData.name : 'performer_image'} />
                <p>{localStorageData.id == id ? 'You' : 'Performer'}</p>
                <h2>{artistData ? artistData.name : ''}</h2>

                <div className={style.options}>
                    <ButtonElem title='Play' func={() => startPlayMusic()}/>
                    {localStorageData.id == id && (<button onClick={() => setShowContextMenu(true)}><FiUpload/></button>)}
                    {localStorageData.id == id ? (<Link to={'/settings'}><IoSettingsOutline/></Link>) : (<button><FiHeart /></button>)}
                </div>
            </div>
            <div className={style.musicList}>
                {artistData && artistData.music_tracks.length > 0 ? (
                    artistData.music_tracks.map((elem: any) => (
                        <MusicItem key={elem.id} id={elem.id} title={elem.title} artist_name={elem.artist_name} artwork_url={elem.artwork_url} music_url={elem.music_url} onList={false} sortedData={artistData.music_tracks} />
                    ))
                ) : (
                    <span className={style.noMusicMessage}>There is nothing</span>
                )}
            </div>
        </div>
    )
}