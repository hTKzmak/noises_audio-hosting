import { useContext } from 'react';
import style from './PaymentWin.module.scss';
import { IoCloseOutline } from "react-icons/io5";
import { Context } from '../../../context/Context';

export default function PaymentWin() {
    const { setShowMenuWindow } = useContext(Context);

    // загрытие окна и удаление данных
    const closeContextMenu = () => {
        setShowMenuWindow(false);
    };


    return (
        <div className={style.paymentMenu}>
            <div className={style.paymentHeader}>
                <h3>Donate</h3>
                <button onClick={closeContextMenu}>
                    <IoCloseOutline />
                </button>
            </div>
            test
        </div>
    );
}
