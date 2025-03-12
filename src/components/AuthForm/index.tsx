import { Link, useLocation } from "react-router-dom";
import style from './AuthForm.module.scss';
import ButtonElem from "../UI/ButtonElem";

import miniLogo from '/noises.svg';
import { useState } from "react";
import classNames from "classnames";
import supabase from "../../config/supabaseClient";

export default function AuthForm() {

    const { pathname } = useLocation();
    const isLogin = pathname.includes('login');

    // отображение сообщения ошибки
    const [error, setError] = useState(false)
    const [formError, setFormError] = useState('You have an error lmao')

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: ""
    });

    // подтверждение формы заполнения
    const handleSubmit = async (evt: React.SyntheticEvent<HTMLFormElement>) => {
        evt.preventDefault();

        if (values.name && values.email && values.password) {

            // // получение данных с таблицы
            // const { data, error } = await supabase
            //     .from('users')
            //     .insert({ id: Date.now(), name: values.name, email: values.email, password_hash: values.password, image_url: '' })
            //     .select()

            // if (error) {
            //     console.log(error)
            //     setFormError('Please fill in all the fields correctly.')
            //     setError(true)
            // }
            // if (data) {
            //     console.log(data)
            //     setFormError('')
            //     setError(false)
            // }

            const data = { id: Date.now(), name: values.name, email: values.email, password_hash: values.password, image_url: 'https://evapkmvcgowyfwuogwbq.supabase.co/storage/v1/object/public/noises_bucket/artworks/default.png' }
            localStorage.setItem('userData', JSON.stringify(data))
            
        }
        else {
            setFormError('Please fill all the fields')
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

                <p className={classNames(error ? style.errorMessage : style.noneError)}>{formError}</p>
            </form>

        </div>
    )
}