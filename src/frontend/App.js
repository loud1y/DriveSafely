import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route, Link, Redirect} from "react-router-dom";
import About from "./pages/About.jsx";
import Posts from "./pages/Posts.jsx";
import Navbar from "./components/UI/navbar/Navbar.jsx";
import Error from "./pages/Error.jsx";
import AppRouter from "./components/UI/AppRouter.jsx";
import {AuthContext} from "./context/index.js";

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