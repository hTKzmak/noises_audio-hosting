import style from './ButtonElem.module.scss';

interface ButtonElemProps {
    title: string;
    func?: any;
}

export default function ButtonElem({title, func}: ButtonElemProps){
    return(
        <button className={style.buttonElem} onClick={func}>{title}</button>
    )
}