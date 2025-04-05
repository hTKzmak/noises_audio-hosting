import { useEffect, useRef, useState } from "react";
import MusicList from "../../components/MusicList";
import PerformerList from "../../components/PerformersList";
import MiniButton from "../../components/UI/MiniButton";
import supabase from "../../config/supabaseClient";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";

type PageType = {
    data: any,
    type: string
}

interface IUser {
    email: string;
    id: number;
    image_url: string;
    name: string;
    password_hash: string;
    performer: boolean | null;
}

export default function ContentPage({ data, type }: PageType) {

    // список музыки и исполнителей
    const { 
        latest_music, 
        popular_music, 
        latest_artists, 
        popular_artists 
    } = useSelector((state: RootState) => state.musicdata);

    // находим нужный нам div элемент с указанием типизации (<HTMLDivElement>)
    const scrollMusicsRef = useRef<HTMLDivElement>(null);
    const scrollArtistsRef = useRef<HTMLDivElement>(null);

    // значение для прокрутки списка
    const scrollValue = 300;

    // для списка музыки и исполнителей
    const handleScroll = (direction: 'left' | 'right', ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollBy({ left: direction === 'left' ? scrollValue : -scrollValue, behavior: 'smooth' });
    };


    return (
        <div className="content">
            <div className="musicContent">
                <div className="contentHeader">
                    <Link to={type === 'home' ? '/musics/latest' : '/musics/popular'} className="headerText">{type === 'home' ? 'Latest music' : 'Popular music'} <IoIosArrowForward/> </Link>
                    <div className="scrollsOption">
                        <MiniButton sign='back' func={() => handleScroll('right', scrollMusicsRef)} />
                        <MiniButton sign='forward' func={() => handleScroll('left', scrollMusicsRef)} />
                    </div>
                </div>
                <MusicList scrollMusicsRef={scrollMusicsRef} onList={true} sortedData={type === 'home' ? latest_music : popular_music}  />
            </div>
            <div className="performersContent">
                <div className="contentHeader">
                    <Link to={type === 'home' ? '/artists/latest' : '/artists/popular'} className="headerText">{type === 'home' ? 'Latest artists' : 'Popular artists'} <IoIosArrowForward/> </Link>
                    <div className="scrollsOption">
                        <MiniButton sign='back' func={() => handleScroll('right', scrollArtistsRef)} />
                        <MiniButton sign='forward' func={() => handleScroll('left', scrollArtistsRef)} />
                    </div>
                </div>
                <PerformerList sortedData={type === 'home' ? latest_artists : popular_artists} onList={true} scrollArtistsRef={scrollArtistsRef} />
            </div>
        </div>
    )
}