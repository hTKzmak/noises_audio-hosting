import { useContext, useRef, useState } from 'react';
import style from './ContextMenu.module.scss'

import { IoCloseOutline } from "react-icons/io5";
import { Context } from '../../context/Context';

import favoriteIcon from '../../assets/icons/navMenu/favorite.svg';
import artistsIcon from '../../assets/icons/navMenu/artists.svg';
import latestIcon from '../../assets/icons/navMenu/latest.svg';
import uploadMusicIcon from '../../assets/icons/contextMenu/upload_music.svg';
import { Link } from 'react-router-dom';
import ButtonElem from '../UI/ButtonElem';

export default function ContextMenu() {

    // получение состояний с app.tsx
    const { showContextMenu, setShowContextMenu, uploadMusic } = useContext(Context)

    // input file
    const fileElem = useRef<HTMLInputElement | null>(null);

    // выбранный файл
    const [choosenFile, setChoosenFile] = useState<File | null>(null);

    // функция по выбору файла
    const chooseFile = () => {
        fileElem.current?.click();
    };

    // выбор файла
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setChoosenFile(files[0])
        }
    };


    return (
        <div className={style.contextContainer} style={{ display: showContextMenu ? 'flex' : 'none' }}>
            <div className={style.contextMenu} style={{top: uploadMusic ? '50px' : 'unset'}}>
                <div className={style.contextHeader}>
                    <h3>{uploadMusic ? 'Upload music' : 'Library'}</h3>
                    <button onClick={() => setShowContextMenu(false)}><IoCloseOutline /></button>
                </div>
                {!uploadMusic ? (
                    <div className={style.libraryNavigation}>
                        <Link onClick={() => setShowContextMenu(!showContextMenu)} to={'/favorite'}><img src={favoriteIcon} alt="#" /> <span>Favorite</span></Link>
                        <Link onClick={() => setShowContextMenu(!showContextMenu)} to={'/artists'}><img src={artistsIcon} alt="#" /> <span>Artists</span></Link>
                        <Link onClick={() => setShowContextMenu(!showContextMenu)} to={'/latest'}><img src={latestIcon} alt="#" /> <span>Latest</span></Link>
                    </div>
                ) : (
                    <div className={style.uploadMusic}>
                        {!choosenFile ? (
                            <div>
                                <img src={uploadMusicIcon} alt="#" />
                                <p>Click the button below to select <br /> them on your device</p>
                                <input
                                    ref={fileElem}
                                    type="file"
                                    id="fileInput"
                                    accept={".mp3"}
                                    hidden
                                    onChange={handleFileChange}
                                />
                                <ButtonElem title='Choose file' func={chooseFile} />
                            </div>
                        ) : (
                            <div className={style.uploadFormContent}>
                                <img src="https://evapkmvcgowyfwuogwbq.supabase.co/storage/v1/object/public/noises_bucket/artworks/default.png" alt="default artwork" />
                                <p><span>Click here</span> to change image</p>

                                <form>
                                    <label>Options</label>
                                    <input type="text" name="title" placeholder='Music name' value={choosenFile.name}/>
                                    <select name="" id="">
                                        <option value="">Genre 1</option>
                                        <option value="">Genre 2</option>
                                        <option value="">Genre 3</option>
                                    </select>
                                    <ButtonElem title={'Upload music'} />
                                </form>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}