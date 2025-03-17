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
import classNames from "classnames";

export default function UploadMusicWin() {

    const { setShowMenuWindow, localStorageData } = useContext(Context);

    // useRef input'ов (для выбора файлов)
    const fileElem = useRef<HTMLInputElement | null>(null);
    const artworkElem = useRef<HTMLInputElement | null>(null);

    // выбранные файлы
    const [choosenFile, setChoosenFile] = useState<File | null>(null);
    const [choosenArtwork, setChoosenArtwork] = useState<File | null>(null);

    // состояния по загрузки файлов
    const [isUploading, setIsUploading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);

    // отображение ошибки
    const [error, setError] = useState(false);
    const [formError, setFormError] = useState('');

    const [values, setValues] = useState({ title: "", genre: "" });

    //  функции выбора файлов
    const chooseFile = () => fileElem.current?.click();
    const chooseArtwork = () => artworkElem.current?.click();

    // загрытие окна и удаление данных
    const closeContextMenu = () => {
        setShowMenuWindow(false);
        setChoosenFile(null);
        setChoosenArtwork(null);
        setIsUploaded(false);
        setError(false);
    };

    // закрытие модального окна с обновлением страницы (нужен для отображения новых данных на странице после загрузки музыки)
    const refreshApp = () => {
        location.reload()
        closeContextMenu()
    }

    // сохдранение данных о файлах в состояния
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]?.type === "audio/mpeg") setChoosenFile(files[0]);
    };

    const handleArtworkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && (files[0]?.type === "image/png" || files[0]?.type === "image/jpeg")) setChoosenArtwork(files[0]);
    };

    // изменение значения input и select
    const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = evt.target;
        setValues(prev => ({ ...prev, [name]: value }));
    };

    // фунция по загрузки файлов (музыка и обложка) и добавление музыки в БД
    const uploadData = async () => {
        setIsUploading(true);
        setError(false);
        setFormError('');

        try {
            let artworkUrl = 'https://evapkmvcgowyfwuogwbq.supabase.co/storage/v1/object/public/noises_bucket/artworks/default.png';
            let musicUrl = '';

            if (choosenArtwork) {
                const { error } = await supabase.storage.from('noises_bucket').upload(`artworks/${values.title}.png`, choosenArtwork);
                if (error) throw error;
                artworkUrl = `https://evapkmvcgowyfwuogwbq.supabase.co/storage/v1/object/public/noises_bucket/artworks/${values.title}.png`;
            }

            if (choosenFile) {
                const { error } = await supabase.storage.from('noises_bucket').upload(`musics/${values.title}.mp3`, choosenFile);
                if (error) throw error;
                musicUrl = `https://evapkmvcgowyfwuogwbq.supabase.co/storage/v1/object/public/noises_bucket/musics/${values.title}.mp3`;
            }

            const musicData = {
                id: Date.now(),
                title: values.title,
                genre: values.genre,
                user_id: localStorageData.id,
                artwork_url: artworkUrl,
                music_url: musicUrl
            };

            const { error } = await supabase.from('music_tracks').insert(musicData);
            if (error) throw error;

            setIsUploaded(true);
        } catch (err) {
            setError(true);
            setFormError('Upload failed. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className={style.uploadMenu}>
            <div className={style.uploadHeader}>
                <h3>Upload music</h3>
                <button onClick={closeContextMenu}>
                    <IoCloseOutline />
                </button>
            </div>
            <div className={style.uploadContent}>
                {isUploading ? (
                    <Loading />
                ) : isUploaded ? (
                    <div className={style.uploadResult}>
                        <img src={successIcon} alt="Success" />
                        <p>Music has been uploaded</p>
                        <ButtonElem title={'Close window'} func={refreshApp} />
                    </div>
                ) : error ? (
                    <div className={style.uploadResult}>
                        <img src={failIcon} alt="Failure" />
                        <p>Music hasn’t been uploaded</p>
                        <ButtonElem title={'Retry'} func={uploadData} />
                    </div>
                ) : !choosenFile ? (
                    <div>
                        <img src={uploadMusicIcon} alt="Upload" />
                        <p>Click the button below to select a file</p>
                        <input ref={fileElem} type="file" accept=".mp3" hidden onChange={handleFileChange} />
                        <ButtonElem title='Choose file' func={chooseFile} />
                    </div>
                ) : (
                    <div className={style.uploadFormContent}>
                        <div className={style.musicImage} style={{ backgroundImage: `url(${choosenArtwork ? URL.createObjectURL(choosenArtwork) : "https://evapkmvcgowyfwuogwbq.supabase.co/storage/v1/object/public/noises_bucket/artworks/default.png"})` }}></div>
                        <input ref={artworkElem} type="file" accept="image/png, image/jpeg" hidden onChange={handleArtworkChange} />
                        <p><span onClick={chooseArtwork}>Click here</span> to change image</p>
                        <form onSubmit={(e) => { e.preventDefault() }}>
                            <label>Options</label>
                            <input type="text" name="title" placeholder='Music name' value={values.title} onChange={handleInputChange} />
                            <select name="genre" value={values.genre} onChange={handleInputChange}>
                                <option value="soundtrack">Soundtrack</option>
                                <option value="classic">Classic</option>
                                <option value="rap">Rap</option>
                                <option value="electro">Electro</option>
                                <option value="cinematic">Cinematic</option>
                            </select>
                            <ButtonElem title={'Upload music'} func={uploadData} />
                            <p className={classNames(error ? style.errorMessage : style.noneError)}>{formError}</p>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
