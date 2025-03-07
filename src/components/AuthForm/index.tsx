import { Link, useLocation } from "react-router-dom";
import style from './AuthForm.module.scss';
import ButtonElem from "../UI/ButtonElem";

import miniLogo from '/noises.svg';
import { useState } from "react";
import classNames from "classnames";

export default function AuthForm() {

    const { pathname } = useLocation();
    const isLogin = pathname.includes('login');
    const [error, setError] = useState(false)

    return (
        <div className={style.authForm}>


            <img src={miniLogo} alt="Logo" />

            {isLogin ? (
                <div>
                    <h3>Welcome back!</h3>
                    <p>Fist time here? <Link to={'/registration'}>Sign up for free</Link></p>
                </div>
            ) : (
                <div>
                    <h3>Welcome!</h3>
                    <p>You have an account? <Link to={'/login'}>Sign in</Link></p>
                </div>
            )}

            <form action="">
                {!isLogin && (<input type="Name" name="" id="" placeholder="Name" />)}
                <input type="email" name="" id="" placeholder="Email" />
                <input type="password" name="" id="" placeholder="Password" />

                <ButtonElem title={isLogin ? 'Sign in' : 'Sign up'} />

                <p className={classNames(error ? style.errorMessage : style.noneError)}>You have an error lmao</p>
            </form>

        </div>
    )
}