import React, {useContext} from 'react';
import MyInput from "../components/UI/input/MyInput.jsx";
import MyButton from "../components/UI/button/MyButton.jsx";
import {AuthContext} from "../context/index.js";

const Login = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext)
    const login = event => {
        event.preventDefault()
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
    }

    return (
        <div className="h-100 d-flex justify-content-center align-items-center flex-column">
            <form onSubmit={login}>
                <MyInput type="text" placeholder="Логин"/>
                <MyInput type="password" placeholder="Пароль"/>
                <div className="row d-flex justify-content-center"><MyButton className="col-auto">Войти</MyButton></div>
            </form>
        </div>
    );
};

export default Login;