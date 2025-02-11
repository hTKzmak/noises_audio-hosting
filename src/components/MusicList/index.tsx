import { useRef } from 'react';
import MusicItem from '../MusicItem'
import style from './MusicList.module.scss'

export default function MusicList({scrollContainerRef}: any) {

    // функция по ббработки скролла колесиком для перелистывания списка
    const handleWheelScroll = (event: React.WheelEvent) => {
        if (scrollContainerRef.current) {
            event.preventDefault();
            scrollContainerRef.current.scrollLeft += event.deltaY * 2;
        }
    };

    return (
        <div className={style.musicList} onWheel={handleWheelScroll} ref={scrollContainerRef}>
            <MusicItem />
            <MusicItem />
            <MusicItem />
            <MusicItem />

            <MusicItem />
            <MusicItem />
            <MusicItem />
            <MusicItem />

            <MusicItem />
            <MusicItem />
            <MusicItem />
            <MusicItem />

            <MusicItem />
            <MusicItem />
            <MusicItem />
            <MusicItem />
        </div>
    )
}