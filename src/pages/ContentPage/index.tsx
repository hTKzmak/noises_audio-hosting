import { useEffect, useRef, useState } from "react";
import MusicList from "../../components/MusicList";
import PerformerList from "../../components/PerformersList";
import MiniButton from "../../components/UI/MiniButton";

type PageType = {
    data: any,
    type: string
}

export default function ContentPage({ data, type }: PageType) {

    // список музыки и исполнителей
    const [musicList, setMusicList] = useState([]);
    const [artistsList, setArtistsList] = useState([]);

    // находим нужный нам div элемент с указанием типизации (<HTMLDivElement>)
    const scrollMusicsRef = useRef<HTMLDivElement>(null);
    const scrollArtistsRef = useRef<HTMLDivElement>(null);

    // значение для прокрутки списка
    const scrollValue = 300;

    // для списка музыки и исполнителей
    const handleScroll = (direction: 'left' | 'right', ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollBy({ left: direction === 'left' ? scrollValue : -scrollValue, behavior: 'smooth' });
    };

    // фильтрация данных в зависимости от страницы
    useEffect(() => {
        if (data?.length > 0) {
            const latestMusic = data.flatMap((item: any) => item.music_tracks);
            const sortedMusic = latestMusic.sort((a: any, b: any) => b.favorite_count - a.favorite_count);
            const sortedArtists = data
                .filter((user: any) => user.favorite_count > 0)
                .sort((a: any, b: any) => b.favorite_count - a.favorite_count);

            setMusicList(type === 'explore' && sortedMusic.length > 0 ? sortedMusic : latestMusic);
            setArtistsList(type === 'explore' && sortedArtists.length > 0 ? sortedArtists : data);
        }
    }, [data, type]);


    return (
        <div className="content">
            <div className="musicContent">
                <div className="contentHeader">
                    <h3 className="headerText">{type === 'home' ? 'Latest music' : 'Popular music'}</h3>
                    <div className="scrollsOption">
                        <MiniButton sign='back' func={() => handleScroll('right', scrollMusicsRef)} />
                        <MiniButton sign='forward' func={() => handleScroll('left', scrollMusicsRef)} />
                    </div>
                </div>
                <MusicList scrollMusicsRef={scrollMusicsRef} onList={true} sortedData={musicList} />
            </div>
            <div className="performersContent">
                <div className="contentHeader">
                    <h3 className="headerText">{type === 'home' ? 'Latest artists' : 'Popular artists'}</h3>
                    <div className="scrollsOption">
                        <MiniButton sign='back' func={() => handleScroll('right', scrollArtistsRef)} />
                        <MiniButton sign='forward' func={() => handleScroll('left', scrollArtistsRef)} />
                    </div>
                </div>
                <PerformerList sortedData={artistsList} onList={true} scrollArtistsRef={scrollArtistsRef} />
            </div>
        </div>
    )
}