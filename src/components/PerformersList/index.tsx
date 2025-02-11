import PerformerItem from '../PerformerItem'
import style from './PerformersList.module.scss'

export default function PerformerList({scrollArtistsRef}: any) {

    return (
        <div className={style.performersList} ref={scrollArtistsRef}>
            <PerformerItem />
            <PerformerItem />
            <PerformerItem />
            <PerformerItem />
            <PerformerItem />
        </div>
    )
}