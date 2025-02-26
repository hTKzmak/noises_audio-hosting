import classNames from 'classnames';
import style from './MiniButton.module.scss';

import { IoIosArrowBack, IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

interface ButtonElemProps {
    sign?: string,
    inPorfilePage?: boolean;
    func?: any;
}

export default function MiniButton({ sign, inPorfilePage, func }: ButtonElemProps) {
    const icon = sign === 'back' ? <IoIosArrowBack /> : sign === 'forward' ? <IoIosArrowForward /> : <IoIosArrowDown />;

    return (
        <button className={classNames(style.miniButton, inPorfilePage ? "inProfilePage" : '')} onClick={func}>
            {icon}
        </button>
    );
}