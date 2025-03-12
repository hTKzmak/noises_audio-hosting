import MusicItem from '../MusicItem';
import ButtonElem from '../UI/ButtonElem'
import style from './ProfileContent.module.scss'

import { FaRegHeart } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

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
    const { data, localStorageData } = useContext(Context)

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


    return (
        <div className={style.profileContent}>
            <div className={style.userBlock}>
                <img src={artistData ? artistData.image_url : 'https://evapkmvcgowyfwuogwbq.supabase.co/storage/v1/object/public/noises_bucket/user_profile_images/default.png'} alt={artistData ? artistData.name : 'performer_image'} />
                {/* нужно будет сделать проверку на самого пользователя. Если мы зашли на свою страницу, то должно быть написано "You" */}
                <p>{localStorageData.id == id ? 'You' : 'Performer'}</p>
                <h2>{artistData ? artistData.name : ''}</h2>

                <div className={style.options}>
                    <ButtonElem title='Play' />
                    {localStorageData.id == id ? (<Link to={'/settings'}><IoSettingsOutline/></Link>) : (<button><FaRegHeart /></button>)}
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