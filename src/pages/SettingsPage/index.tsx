import { useNavigate } from "react-router-dom";
import MiniButton from "../../components/UI/MiniButton";
import { useContext } from "react";
import { Context } from "../../context/Context";
import supabase from "../../config/supabaseClient";

export default function SettingsPage() {

    const { localStorageData } = useContext(Context)

    const userId = localStorageData?.id;

    const navigate = useNavigate();

    const logoutFunc = () => {
        localStorage.clear()
        navigate('/login');
    }

    if (!userId) {
        // Обработка случая, когда пользователь не авторизован
        console.error('Не удалось получить ID пользователя');
        return; // или throw new Error()
    }

    const deleteAccFunc = async () => {
        const { data, error } = await supabase.from('users').delete().eq('id', userId).select()

        if (error) {
            console.error(error)
        }
        if (data) {
            localStorage.clear()
            navigate('/login');
        }
    }

    return (
        <div className="content">
            <div className="settingsHeader">
                <MiniButton sign='back' inProfilePage={true} func={() => navigate(-1)} />
                <h3 className="headerText">
                    Settings
                </h3>
            </div>

            <ul className="settings">
                <li><a href="https://github.com/hTKzmak/noises_audio-hosting" target="_blank">Project info</a></li>
                <li><a href="https://github.com/hTKzmak/noises_audio-hosting" target="_blank">Documentation</a></li>
                <li><button onClick={logoutFunc}>Log out</button></li>
                <li><button onClick={deleteAccFunc}>Delete account</button></li>
            </ul>
        </div>
    )
}