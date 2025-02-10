import MusicList from "../../components/MusicList";
import PerformerList from "../../components/PerformersList";

export default function HomePage() {
    return (
        <div className="content">
            <div className="music_content">
                <h3>Popular music</h3>
                <MusicList/>
            </div>
            <div className="performers_content">
                <h3>Popular artists</h3>
                <PerformerList />
            </div>
        </div>
    )
}