import style from './Loading.module.scss';

type inPlayer = {
    inPlayer?: boolean
}

function Loading({inPlayer}: inPlayer){
    return(
        <div className={style.loading} style={{height: inPlayer ? 'auto' : '100vh'}}>
            <span className={inPlayer ? style.loaderPlayer : style.loader}></span>
        </div>
    )
}

export default Loading