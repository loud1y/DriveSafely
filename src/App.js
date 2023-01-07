import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Navbar from "./frontend/components/UI/navbar/Navbar.jsx";
import AppRouter from "./frontend/components/UI/AppRouter.jsx";
import {AuthContext} from "./frontend/context/index.js";

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setisLoading] = useState(true);

    useEffect(()=>{
        if(localStorage.getItem('auth')) {
            setIsAuth(true)
        }
        setisLoading(false)
    }, [])

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading
        }}>
            <BrowserRouter >
                <Navbar/>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    );
};

export default App;