import ButtonElem from "../../components/UI/ButtonElem";

export default function ErrorPage(){
    return(
        <div className="ErrorContent">
            <h1>404</h1>
            <p>We couldn’t find this page <br/> you are looking for.</p>
            <ButtonElem title={'Return to Home Page'}/>
        </div>
    )
}