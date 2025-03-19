import { useEffect, useRef, useState } from "react";
import MusicList from "../../components/MusicList";
import PerformerList from "../../components/PerformersList";
import MiniButton from "../../components/UI/MiniButton";

type PageType = {
    data: any,
    type: string
}

export default function ContentPage({ data, type }: PageType) {
    
    const [onlyMusic, setOnlyMusic] = useState([]);

    // находим нужный нам div элемент с указанием типизации (<HTMLDivElement>)
    const scrollMusicsRef = useRef<HTMLDivElement>(null);
    const scrollArtistsRef = useRef<HTMLDivElement>(null);

    // значение для прокрутки списка
    const scrollValue = 300;

    // для списка музыки и исполнителей
    const handleScroll = (direction: 'left' | 'right', ref: React.RefObject<HTMLDivElement>) => {
        if (ref.current) {
            ref.current.scrollLeft += direction === 'left' ? scrollValue : -scrollValue;
        }
    };

    // фильтрация данных, чтобы оставались только треки для их отображения
    useEffect(() => {
        if (data && data.length > 0) {
            const newData = data.flatMap((item: any) => item.music_tracks);
            setOnlyMusic(newData);
        }
    }, [data]);

    return (
        <div className="content">
            <div className="musicContent">
                <div className="contentHeader">
                    <h3 className="headerText">{type === 'homepage' ? 'Recommended music' : 'Popular music'}</h3>
                    <div className="scrollsOption">
                        <MiniButton sign='back' func={() => handleScroll('right', scrollMusicsRef)} />
                        <MiniButton sign='forward' func={() => handleScroll('left', scrollMusicsRef)} />
                    </div>
                </div>
                <MusicList scrollMusicsRef={scrollMusicsRef} onList={true} sortedData={onlyMusic}/>
            </div>
            <div className="performersContent">
                <div className="contentHeader">
                    <h3 className="headerText">{type === 'homepage' ? 'Recommended artists' : 'Popular artists'}</h3>
                    <div className="scrollsOption">
                        <MiniButton sign='back' func={() => handleScroll('right', scrollArtistsRef)} />
                        <MiniButton sign='forward' func={() => handleScroll('left', scrollArtistsRef)} />
                    </div>
                </div>
                <PerformerList sortedData={data} onList={true} scrollArtistsRef={scrollArtistsRef} />
            </div>
        </div>
    )
}