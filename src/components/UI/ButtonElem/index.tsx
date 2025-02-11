import style from './ButtonElem.module.scss';

interface ButtonElemProps {
    title: string;
}

export default function ButtonElem({title}: ButtonElemProps){
    return(
        <button className={style.buttonElem}>{title}</button>
    )
}