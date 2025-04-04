import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import MusicList from "../../components/MusicList";
import supabase from "../../config/supabaseClient";

interface MusicListPageProps {
    showContent: string;
}

interface IUser {
    email: string;
    id: number;
    image_url: string;
    name: string;
    password_hash: string;
    performer: boolean | null;
}

export default function MusicListPage({ showContent }: MusicListPageProps) {

    // ЧИСТИ ГОВНО С ПОМОЩЬЮ REDUX

    // получение данных с app.tsx
    const { data, localStorageData, sessionStorageData, searchResults } = useContext(Context);

    // данные пользователя, которые будут храниться в artistData
    const [userFavList, setUserFavList] = useState<any[]>([]);
    // список музыки и исполнителей
    const [musicList, setMusicList] = useState([]);
    const [latestArtists, setLatestArtists] = useState<IUser[]>([]);

    // находим данные пользователя по id
    useEffect(() => {
        if (showContent === 'favorite') {
            if (data?.length > 0) {
                const foundUser = data.find((elem: any) => elem.id === Number(localStorageData.id));
                setUserFavList(foundUser?.favorite_music || []);
            }
        }
        // получаем всю музыку и сортируем их
        else {
            const getUsers = async () => {
                const { data, error } = await supabase
                    .from('users')
                    .select()

                if (error) {
                    console.error(error)
                }
                if (data) {
                    setLatestArtists(data.reverse())
                }
            }

            getUsers()

            if (data?.length > 0) {
                const latestMusic = data.flatMap((item: any) => item.music_tracks);
                const sortedMusic = latestMusic.sort((a: any, b: any) => b.favorite_count - a.favorite_count);
                setMusicList(showContent === 'popular' && sortedMusic.length > 0 ? sortedMusic.slice(0, 24) : latestMusic.reverse().slice(0, 24));
            }
        }
    }, [localStorageData.id, data, latestArtists, showContent]);

    const hasFavMusic = userFavList.length > 0;
    const hasListenedMusic = sessionStorageData?.length > 0;
    const hasOtherMusic = musicList?.length > 0;
    const hasSearchResults = searchResults.length > 0;

    const hasData = (showContent === 'favorite' && hasFavMusic) ||
        (showContent === 'listened' && hasListenedMusic) ||
        (showContent === 'search' && hasSearchResults) || 
        ((showContent === 'popular' || showContent === 'latest') && hasOtherMusic);

    return (
        <div className={hasData ? "content" : "noContent"}>
            {hasData && (
                <h3 className="headerText">
                    {showContent === "favorite" ? "Favorite music" :
                        showContent === "listened" ? "Listened music" :
                            showContent === "search" ? "Search results" :
                                showContent === "popular" ? "Popular music" :
                                    showContent === "latest" ? "Latest music" :
                                        ""}
                </h3>
            )}
            <div className="listContent">
                {showContent === "favorite" && hasFavMusic ? (
                    <MusicList onList={false} sortedData={userFavList} />
                ) : showContent === "listened" && hasListenedMusic ? (
                    <MusicList onList={false} sortedData={sessionStorageData} />
                ) : showContent === "search" && hasSearchResults ? (
                    <MusicList onList={false} sortedData={searchResults} />
                ) : showContent === "popular" && hasOtherMusic ? (
                    <MusicList onList={false} sortedData={musicList} />
                ) : showContent === "latest" && hasOtherMusic ? (
                    <MusicList onList={false} sortedData={musicList} />
                ) : (
                    <span>There is nothing</span>
                )}
            </div>
        </div>
    );
}