import PerformerItem from '../PerformerItem'
import style from './PerformersList.module.scss'

export default function PerformerList({ data, scrollArtistsRef }: any) {

    return (
        <div className={style.performersList} ref={scrollArtistsRef}>
            {data.map((elem: any) => (
                <PerformerItem key={elem.id} id={elem.id} name={elem.name} image_url={elem.image_url}/>
            ))}
        </div>
    )
}