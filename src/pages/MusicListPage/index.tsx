import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import MusicList from "../../components/MusicList";

interface MusicListPageProps {
    showContent: string;
}

export default function MusicListPage({ showContent }: MusicListPageProps) {

    // получение данных с app.tsx
    const { data, localStorageData, sessionStorageData } = useContext(Context)

    // данные пользователя, которые будут храниться в artistData
    const [userFavList, setUserFavList] = useState<any[]>([]);

    // находим данные пользователя по id
    useEffect(() => {
        if (data?.length > 0) {
            const foundUser = data.find((elem: any) => elem.id === Number(localStorageData.id));
            setUserFavList(foundUser?.favorite_music || []);
        }
    }, [localStorageData.id, data]);

    const hasFavMusic = userFavList.length > 0;
    const hasLatestMusic = sessionStorageData?.length > 0;
    const hasData = (showContent == 'favorite' && hasFavMusic) || (showContent == 'latest' && hasLatestMusic)

    return (
        <div className={hasData ? "content" : "noContent"}>
            {hasData && (
                <h3 className="headerText">
                    {showContent === "favorite" ? (hasFavMusic ? "Favorite music" : "") :
                        showContent === "latest" ? (hasLatestMusic ? "Latest music" : "") : ""}
                </h3>
            )}
            <div className="listContent">
                {showContent === "favorite" && hasFavMusic ? (
                    <MusicList onList={false} sortedData={userFavList}/>
                ) : showContent === "latest" && hasLatestMusic ? (
                    <MusicList onList={false} sortedData={sessionStorageData}/>
                ) : (
                    <span>There is nothing</span>
                )}
            </div>
        </div>
    )
}