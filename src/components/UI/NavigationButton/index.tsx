import classNames from 'classnames';
import style from './NavigationButton.module.scss';

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface ButtonElemProps {
    sign: string,
    inPorfilePage?: boolean;
    func?: any;
}

export default function NavigationButton({sign, inPorfilePage, func}: ButtonElemProps){
    return(
        <button className={classNames(style.navigationButton, inPorfilePage ? "inProfilePage" : '')} onClick={func}>{sign === 'back' ? <IoIosArrowBack/> : <IoIosArrowForward />}</button>
    )
}