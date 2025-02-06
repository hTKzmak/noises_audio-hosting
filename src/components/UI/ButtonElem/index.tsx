import './ButtonElem.scss'

interface ButtonElemProps {
    title: string;
}

export default function ButtonElem({title}: ButtonElemProps){
    return(
        <button>{title}</button>
    )
}