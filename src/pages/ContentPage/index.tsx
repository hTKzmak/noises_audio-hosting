import { useRef } from "react";
import MusicList from "../../components/MusicList";
import PerformerList from "../../components/PerformersList";

type PageType = {
    data: any,
    type: string
}

export default function ContentPage({ data, type }: PageType) {

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

    return (
        <div className="content">
            <div className="musicContent">
                <div className="contentHeader">
                    <h3>{type === 'homepage' ? 'Recommended music' : 'Popular music'}</h3>
                    <div className="scrollsOption">
                        <button onClick={() => handleScroll('right', scrollMusicsRef)}>Right</button>
                        <button onClick={() => handleScroll('left', scrollMusicsRef)}>Left</button>
                    </div>
                </div>
                <MusicList data={data} scrollMusicsRef={scrollMusicsRef} />
            </div>
            <div className="performersContent">
                <div className="contentHeader">
                    <h3>{type === 'homepage' ? 'Recommended artists' : 'Popular artists'}</h3>
                    <div className="scrollsOption">
                        <button onClick={() => handleScroll('right', scrollArtistsRef)}>Right</button>
                        <button onClick={() => handleScroll('left', scrollArtistsRef)}>Left</button>
                    </div>
                </div>
                <PerformerList data={data} scrollArtistsRef={scrollArtistsRef} />
            </div>
        </div>
    )
}