import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import About from "../../pages/About.jsx";
import Posts from "../../pages/Posts.jsx";
import Error from "../../pages/Error.jsx";
import PostPage from "../../pages/PostPage.jsx";
import {publicRoutes, privateRoutes} from "../../router/index.js";
import {AuthContext} from "../../context/index.js";
import Loader from "./loader/Loader.jsx";

const AppRouter = () => {

    const {isAuth, setIsAuth, isLoading} = useContext(AuthContext);
    console.log(isAuth)

    if (isLoading) {
        return <Loader/>
    }

    return (
        <Routes>
            {isAuth ? privateRoutes.map(route =>
                <Route path={route.path} element={route.component} exact={route.exact} key={route.path}/>
            ) : ""}
            {publicRoutes.map(route =>
                <Route path={route.path} element={route.component} exact={route.exact} key={route.path}/>
            )}
        </Routes>
    );
};

export default AppRouter;