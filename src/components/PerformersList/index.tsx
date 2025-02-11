import PerformerItem from '../PerformerItem'
import style from './PerformersList.module.scss'

export default function PerformerList(){
    return(
        <div className={style.performersList}>
            <PerformerItem/>
            <PerformerItem/>
            <PerformerItem/>
            <PerformerItem/>
            <PerformerItem/>
        </div>
    )
}