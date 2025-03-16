import { useContext } from 'react';
import LibraryNavWin from './LibraryNavWin';
import style from './MenuWindow.module.scss';
import { Context } from '../../context/Context';
import UploadMusicWin from './UploadMusicWin';

// этот компонент предназначен для размещенеия других модальных окнов/контекстных меню, чтобы было удобно с каждым работать
export default function MenuWindow() {

    // получение состояний с app.tsx
    const { showMenuWindow, uploadMusic } = useContext(Context)

    return (
        <div className={style.menuWindow_container} style={{ display: showMenuWindow ? 'flex' : 'none' }}>
            {uploadMusic ? (<UploadMusicWin />) : (<LibraryNavWin />)}
        </div>
    )
}