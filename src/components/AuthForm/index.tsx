import { Link, useLocation } from "react-router-dom";
import style from './AuthForm.module.scss';
import ButtonElem from "../UI/ButtonElem";

import miniLogo from '/noises.svg';
import { useState } from "react";
import classNames from "classnames";

export default function AuthForm() {

    const { pathname } = useLocation();
    const isLogin = pathname.includes('login');

    // отображение сообщения ошибки
    const [error, setError] = useState(false)

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: ""
    });

    // подтверждение формы заполнения
    const handleSubmit = (evt: React.SyntheticEvent<HTMLFormElement>) => {
        evt.preventDefault();

        if (values.name && values.email && values.password) {
            setError(true)
        }
        else {
            setError(true)
        }

    }

    // отслеживание и изменение input'ов
    const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        evt.preventDefault();

        const { name, value } = evt.target;
        setValues((values) => ({
            ...values,
            [name]: value
        }));
    };

    // очистка формы и сообщения об ошибке
    const clearForm = () => {
        setValues({
            name: "",
            email: "",
            password: ""
        })

        setError(false)
    }

    return (
        <div className={style.authForm}>


            <img src={miniLogo} alt="Logo" />

            {isLogin ? (
                <div>
                    <h3>Welcome back!</h3>
                    <p>Fist time here? <Link to={'/registration'} onClick={clearForm}>Sign up for free</Link></p>
                </div>
            ) : (
                <div>
                    <h3>Welcome!</h3>
                    <p>You have an account? <Link to={'/login'} onClick={clearForm}>Sign in</Link></p>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {!isLogin && (<input type="text" name="name" placeholder="Name" value={values.name} onChange={handleInputChange} />)}
                <input type="email" name="email" placeholder="Email" value={values.email} onChange={handleInputChange} />
                <input type="password" name="password" placeholder="Password" value={values.password} onChange={handleInputChange} />

                <ButtonElem title={isLogin ? 'Sign in' : 'Sign up'} />

                <p className={classNames(error ? style.errorMessage : style.noneError)}>You have an error lmao</p>
            </form>

        </div>
    )
}