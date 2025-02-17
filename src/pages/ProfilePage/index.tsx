import { useNavigate } from "react-router-dom";
import ProfileContent from "../../components/ProfileContent";
import NavigationButton from "../../components/UI/NavigationButton";

export default function ProfilePage() {

    const navigate = useNavigate();

    return (
        <div className="content">
            <NavigationButton sign='back' inPorfilePage={true} func={() => navigate(-1)} />
            <ProfileContent />
        </div>
    )
}