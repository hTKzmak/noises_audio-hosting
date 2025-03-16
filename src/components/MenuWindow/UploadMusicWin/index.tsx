import { useContext, useRef, useState } from "react";
import ButtonElem from "../../UI/ButtonElem";
import { Context } from "../../../context/Context";

import style from './UploadMusicWin.module.scss';
import { IoCloseOutline } from "react-icons/io5";

import uploadMusicIcon from '../../../assets/icons/contextMenu/upload_music.svg';
import successIcon from '../../../assets/icons/contextMenu/success.svg';
import failIcon from '../../../assets/icons/contextMenu/fail.svg';
import Loading from "../../Loading";
import supabase from "../../../config/supabaseClient";

// отдельное окно, предназначенное для загрузки музыки
export default function UploadMusicWin() {

    // получение состояний с app.tsx
    const { showMenuWindow, setShowMenuWindow, uploadMusic } = useContext(Context)

    // input file
    const fileElem = useRef<HTMLInputElement | null>(null);

    // выбранный файл
    const [choosenFile, setChoosenFile] = useState<File | null>(null);

    const [isUploaded, setIsUploaded] = useState(true)

    // функция по выбору файла
    const chooseFile = () => {
        fileElem.current?.click();
    };

    // выбор файла
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0 && files[0].type == "audio/mpeg") {
            setChoosenFile(files[0])
        }
    };

    // закрытие окна
    const closeContextMenu = () => {
        setShowMenuWindow(false)
        uploadMusic && setChoosenFile(null)
    }

    const refreshApp = () => {
        location.reload()
    }


    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (choosenFile) {
            const { data, error } = await supabase
                .storage
                .from('noises_bucket')
                .upload('musics/music.mp3', choosenFile, {
                    cacheControl: '3600',
                    upsert: false
                })

            if (error) {
                console.error(error)
            }
            if (data) {
                console.log(data)
            }
        }
    }

    return (
        <div className={style.uploadMenu}>
            <div className={style.uploadHeader}>
                <h3>Upload music</h3>
                <button onClick={closeContextMenu}><IoCloseOutline /></button>
            </div>
            <div className={style.uploadContent}>

                {/* Элементы окна для загрузки музыки: */}

                {!choosenFile ? (
                    <div>
                        <img src={uploadMusicIcon} alt="#" />
                        <p>Click the button below to select them on your device</p>
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
                            <input type="text" name="title" placeholder='Music name' />
                            <select name="" id="">
                                <option value="">Genre 1</option>
                                <option value="">Genre 2</option>
                                <option value="">Genre 3</option>
                            </select>
                            <ButtonElem title={'Upload music'} func={handleSubmit} />
                        </form>
                    </div>
                )}


                {/* Загрузка: */}
                {/* <Loading /> */}

                {/* Результат загрузки файла: */}

                {/* {isUploaded ? (
                    <div className={style.uploadResult}>
                        <img src={successIcon} alt="#" />
                        <p>Music has been uploaded</p>
                        <ButtonElem title={'Close window'} func={refreshApp} />
                    </div>
                ) : (
                    <div className={style.uploadResult}>
                        <img src={failIcon} alt="#" />
                        <p>Music hasn’t been uploaded</p>
                        <ButtonElem title={'Retry'} />
                    </div>
                )} */}
            </div>
        </div>
    )
}