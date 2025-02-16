import classNames from 'classnames';
import MusicItem from '../MusicItem';
import ButtonElem from '../UI/ButtonElem'
import style from './ProfileContent.module.scss'

import { FaRegHeart } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useEffect, useState } from 'react';

import defaultImage from '../../assets/images/default.png';

type ArtistData = {
    artist: string,
    image: string,
    music: any[],
    id: number,
}

export default function ProfileContent() {

    const navigate = useNavigate();
    const data = useSelector((state: RootState) => state.musicdata.data)

    const [artistData, setArtistData] = useState<ArtistData | undefined>();
    // // находим с помощью useParams значение id
    const { id } = useParams()

    useEffect(() => {
        const foundArtist = data.find((elem) => elem.id === Number(id));
        if (foundArtist) {
            setArtistData(foundArtist)
        }
    }, [id, data]);


    return (
        <div className={classNames(style.profileContent, 'content')}>
            <div className={style.userBlock}>
                <button className={style.exit} onClick={() => navigate(-1)}>Exit</button>
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