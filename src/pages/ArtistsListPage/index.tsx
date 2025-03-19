import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import PerformerList from "../../components/PerformersList";

export default function ArtistsListPage() {

    // получение данных с app.tsx
    const { data, localStorageData } = useContext(Context)

    // данные пользователя, которые будут храниться в artistData
    const [userFavArtists, setUserFavArtists] = useState<any[]>([]);

    // находим данные пользователя по id
    useEffect(() => {
        if (data?.length > 0) {
            const foundUser = data.find((elem: any) => elem.id === Number(localStorageData.id));
            setUserFavArtists(foundUser?.favorite_artists || []);
        }
    }, [localStorageData.id, data]);

    const hasData = userFavArtists && userFavArtists.length > 0

    return (
        <div className={hasData ? "content" : "noContent"}>
            {hasData && (
                <h3 className="headerText">
                    Favorite artists
                </h3>
            )}
            <div className="listContent">
                {hasData ? (
                    <PerformerList onList={false} sortedData={userFavArtists}/>
                ) : (
                    <span>There is nothing</span>
                )}
            </div>
        </div>
    )
}