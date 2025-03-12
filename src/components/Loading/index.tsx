import style from './Loading.module.scss';

function Loading(){
    return(
        <div className={style.loading}>
            <span className={style.loader}></span>
        </div>
    )
}

export default Loading