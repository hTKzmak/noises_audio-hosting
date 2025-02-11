import { useRef } from "react";
import MusicList from "../../components/MusicList";
import PerformerList from "../../components/PerformersList";

type PageType = {
    type: string
}

export default function ContentPage({ type }: PageType) {

    // находим нужный нам div элемент с указанием типизации (<HTMLDivElement>)
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollLeftList = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += 250;
        }
    }

    const scrollRightList = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft -= 250;
        }
    }

    return (
        <div className="content">
            <div className="musicContent">
                <h3>{type === 'homepage' ? 'Recommended music' : 'Popular music'}</h3>
                <button onClick={scrollRightList}>Right</button>
                <button onClick={scrollLeftList}>Left</button>
                <MusicList scrollContainerRef={scrollContainerRef} />
            </div>
            <div className="performersContent">
                <h3>{type === 'homepage' ? 'Recommended artists' : 'Popular artists'}</h3>
                <PerformerList />
            </div>
        </div>
    )
}