import MusicList from "../../components/MusicList";
import PerformerList from "../../components/PerformersList";

type PageType = {
    type: string
}

export default function ContentPage({type}: PageType) {
    return (
        <div className="content">
            <div className="musicContent">
                <h3>{type === 'homepage' ? 'Recommended music' : 'Popular music'}</h3>
                <MusicList/>
            </div>
            <div className="performersContent">
                <h3>{type === 'homepage' ? 'Recommended artists' : 'Popular artists'}</h3>
                <PerformerList />
            </div>
        </div>
    )
}