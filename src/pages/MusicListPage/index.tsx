import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import MusicItem from "../../components/MusicItem";

interface MusicListPageProps {
    showContent: string;
}

export default function MusicListPage({ showContent }: MusicListPageProps) {

    // получение данных с app.tsx
    const { data, localStorageData } = useContext(Context)

    // данные пользователя, которые будут храниться в artistData
    const [userFavList, useUserFavList] = useState<any | undefined>();

    // находим данные пользователя по id
    useEffect(() => {
        const foundUser = data.find((elem: any) => elem.id === Number(localStorageData.id));
        if (foundUser) {
            useUserFavList(foundUser.favorite_music)
        }
        console.log(showContent)
    }, [localStorageData.id, data]);

    return (
        <div className={userFavList && userFavList.length > 0 ? 'content' : 'noContent'}>
            <h3 className="headerText">{userFavList && userFavList.length > 0 ? 'Favorite music' : ''}</h3>
            <div className="musicListContent">
                {userFavList && userFavList.length > 0 ? (
                    userFavList.map((elem: any) => (
                        <MusicItem key={elem.id} id={elem.id} title={elem.title} artist_name={elem.artist_name} artwork_url={elem.artwork_url} music_url={elem.music_url} onList={false} sortedData={userFavList} />
                    ))
                ) : (
                    <span>There is nothing</span>
                )}
            </div>
        </div>
    )
}