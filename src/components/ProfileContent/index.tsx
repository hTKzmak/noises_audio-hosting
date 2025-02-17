import MusicItem from '../MusicItem';
import ButtonElem from '../UI/ButtonElem'
import style from './ProfileContent.module.scss'

import { FaRegHeart } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import defaultImage from '../../assets/images/default.png';
import { Context } from '../../context/Context';

// типизация данных для artistData
type ArtistData = {
    artist: string,
    image: string,
    music: any[],
    id: number,
}

export default function ProfileContent() {

    // получение дпнных с app.tsx
    const { data } = useContext(Context)

    // данные пользователя, которые будут храниться в artistData
    const [artistData, setArtistData] = useState<ArtistData | undefined>();

    // находим с помощью useParams значение id
    const { id } = useParams()

    // находим данные пользователя по id
    useEffect(() => {
        const foundArtist = data.find((elem: any) => elem.id === Number(id));
        if (foundArtist) {
            setArtistData(foundArtist)
        }
    }, [id, data]);


    return (
        <div className={style.profileContent}>
            <div className={style.userBlock}>
                <img src={artistData ? artistData.image : defaultImage} alt="#" />
                <p>Performer</p>
                <h2>{artistData ? artistData.artist : ''}</h2>

                <div className={style.options}>
                    <ButtonElem title='Play' />
                    <button><FaRegHeart /></button>
                </div>
            </div>
            <div className={style.musicList}>
                {artistData ? (
                    artistData.music.map((elem: any) => (
                        <MusicItem key={elem.id} id={elem.id} title={elem.title} artist={elem.artist} artwork={elem.artwork} url={elem.url} onList={false} />
                    ))
                ) : (
                    <span className={style.noMusicMessage}>There is nothing</span>
                )}
            </div>
        </div>
    )
}