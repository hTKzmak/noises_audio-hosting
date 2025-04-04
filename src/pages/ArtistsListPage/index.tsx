import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import PerformerList from "../../components/PerformersList";
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

export default function ArtistsListPage({ showContent }: MusicListPageProps) {

    // ЧИСТИ ГОВНО С ПОМОЩЬЮ REDUX

    // получение данных с app.tsx
    const { data, localStorageData } = useContext(Context)

    // данные пользователя, которые будут храниться в artistData
    const [userFavArtists, setUserFavArtists] = useState<any[]>([]);

    const [popularArtistsList, setPopularArtistsList] = useState([]);
    const [latestArtistsList, setLatestArtistsList] = useState<IUser[]>([]);

    // находим данные пользователя по id
    useEffect(() => {
        if (showContent === 'favorite') {
            const foundUser = data.find((elem: any) => elem.id === Number(localStorageData.id));
            setUserFavArtists(foundUser?.favorite_artists || []);
        }
        else {
            const getUsers = async () => {
                const { data, error } = await supabase
                    .from('users')
                    .select()

                if (error) {
                    console.error(error)
                }
                if (data) {
                    setLatestArtistsList(data.reverse())
                    console.log(data)
                }
            }

            getUsers()

            if (data?.length > 0) {
                const sortedArtists = data
                    .filter((user: any) => user.favorite_count > 0)
                    .sort((a: any, b: any) => b.favorite_count - a.favorite_count);

                setPopularArtistsList(sortedArtists);

                console.log(popularArtistsList)
            }
        }
    }, [localStorageData.id, data, showContent]);

    const hasFavArtists = userFavArtists.length > 0;
    const hasOtherArtists = popularArtistsList.length > 0;

    const hasData = (showContent === 'favorite' && hasFavArtists) ||
        ((showContent === 'latest' || showContent === 'popular') && hasOtherArtists);

    return (
        <div className={hasData ? "content" : "noContent"}>
            {hasData && (
                <h3 className="headerText">
                    {showContent === "favorite" ? "Favorite artists" :
                        showContent === "popular" ? "Popular artists" :
                            showContent === "latest" ? "Latest artists" :
                                ""}
                </h3>
            )}
            <div className="listContent">
                {showContent === "favorite" && hasFavArtists ? (
                    <PerformerList onList={false} sortedData={userFavArtists} />
                ) : showContent === "popular" && hasOtherArtists ? (
                    <PerformerList onList={false} sortedData={popularArtistsList} />
                ) : showContent === "latest" && hasOtherArtists ? (
                    <PerformerList onList={false} sortedData={latestArtistsList} />
                ) : (
                    <span>There is nothing</span>
                )}
            </div>
        </div>
    )
}