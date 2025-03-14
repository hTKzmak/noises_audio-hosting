import { useContext } from 'react';
import style from './ContextMenu.module.scss'

import { IoCloseOutline } from "react-icons/io5";
import { Context } from '../../context/Context';

export default function ContextMenu() {

    // получение состояний с app.tsx
    const { showContextMenu, setShowContextMenu } = useContext(Context)

    return (
        <div className={style.contextContainer} style={{display: showContextMenu ? 'flex' : 'none'}}>
            <div className={style.contextMenu}>
                <div className={style.contextHeader}>
                    <h3>Text</h3>
                    <button onClick={() => setShowContextMenu(false)}><IoCloseOutline/></button>
                </div>
            </div>
        </div>
    )
}