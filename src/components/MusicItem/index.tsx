import style from './MusicItem.module.scss'
import classNames from 'classnames';

import { useContext, useState } from 'react';
import { Context } from '../../context/Context';

import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useLocation } from 'react-router-dom';
import supabase from '../../config/supabaseClient';
import { useDispatch } from 'react-redux';
import { deleteMusic } from '../../features/musicdata';

export default function MusicItem({ id, title, artist_name, artwork_url, onList, sortedData }: any) {

    // получение данных с app.tsx
    const { data, setCurrentSong, setShowMiniPlayer, setSongs, latestMusic, localStorageData, setLatestMusic } = useContext(Context)

    const { pathname } = useLocation();
    const myProfile = pathname.includes('profile') && pathname.includes(localStorageData.id);

    const dispatch = useDispatch();

    // Храним id любимых треков
    const [isFavorite, setIsFavorite] = useState(true)

    function startPlayMusic(id: number) {
        if (data && data.length > 0) {
            setSongs(sortedData)

            // находим список музыки
            const newData = data.flatMap((item: any) => item.music_tracks);

            // проходимся по ним
            newData.map((elem: any) => {

                // находим выбранную нами музыку по id
                if (elem.id === id) {
                    // если выбранной музыки нет в списке недавно прослушанных, то добавляем его в список
                    if (!latestMusic.find((music: any) => music.id === elem.id)) {
                        setLatestMusic((prev: any) => [...prev, elem]);
                    }

                    setCurrentSong(elem)

                    // будет отображаться еще основной плеер, только если экран будет больше 768px, иначе бкдет отображаться мини-плеер для мобильных устройств
                    setShowMiniPlayer(true)
                }
            })
        }
    }

    // функционал удаления музыки
    const deleteFunc = async (e: any) => {
        e.stopPropagation();
    
        const userId = localStorageData.id;
        const musicId = id;
    
        // также удаляем музыку с разметки
        dispatch(deleteMusic({ userId, musicId }));
    
        try {
            // Удаление музыки из БД
            const { error: dbError } = await supabase
                .from('music_tracks')
                .delete()
                .eq('id', musicId);
    
            if (dbError) throw dbError;
    
            // Удаление файлов (аудиофайл и обложка)
            await deleteFileFromStorage('musics', `music_${musicId}`);
            await deleteFileFromStorage('artworks', `artwork_${musicId}`);
        } catch (error) {
            console.error('Ошибка при удалении:', error);
        }
    };
    
    // удаление файлов со storage
    const deleteFileFromStorage = async (bucket: string, prefix: string) => {
        try {
            const { data, error } = await supabase.storage.from('noises_bucket').list(bucket);
            if (error) throw error;
    
            const file = data.find(elem => elem.name.includes(prefix));
            if (file) {
                await supabase.storage.from('noises_bucket').remove([`${bucket}/${file.name}`]);
                console.log(`Файл ${file.name} удалён`);
            }
        } catch (error) {
            console.error(`Ошибка при удалении файла из ${bucket}:`, error);
        }
    };
    

    const favoriteFunc = (e: any) => {
        e.stopPropagation();
        setIsFavorite(!isFavorite)
    }

    return (
        <div className={classNames(style.musicItem, onList ? style.onList : '')} onClick={() => startPlayMusic(id)} id={id}>
            <div className={style.musicImage} style={{ backgroundImage: `url(${artwork_url ? artwork_url : 'https://evapkmvcgowyfwuogwbq.supabase.co/storage/v1/object/public/noises_bucket/artworks/default.png'})` }}></div>
            <div className={style.musicInfo}>
                <span>{title}</span>
                <span>{artist_name}</span>
            </div>
            <div className={style.options}>
                <button onClick={favoriteFunc}>{isFavorite ? <FaHeart /> : <FaRegHeart />}</button>
                {myProfile && <button onClick={deleteFunc}><FaTrash /></button>}
            </div>
        </div>
    )
}